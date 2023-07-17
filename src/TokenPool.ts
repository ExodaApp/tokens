import { BigNumber } from 'bignumber.js'
import { BaseToken } from './BaseToken'
import { Token } from './Token'
import { UniswapV2Pair, UniswapV2Pair__factory } from './types/contracts'
import { Chain, InitializeParams } from './types'
import { getProvider } from './constants/providers'
import { toExodaChain } from './helpers'
import { JsonRpcProvider } from '@ethersproject/providers'

interface Reserves {
    token0: string,
    token1: string,
}

export class TokenPool extends BaseToken<UniswapV2Pair> {
    constructor(
        public token0: Token,
        public token1: Token,
        public reserves: Reserves,
        chain: Chain,
        address: string,
        name: string,
        decimals: number,
        totalSupply: string,
        provider: JsonRpcProvider,
    ) {
        super(chain, address, name, decimals, totalSupply, provider)
    }

    public get symbol(): string {
        return `${this.token0.symbol}-${this.token1.symbol}`
    }

    public get contract(): UniswapV2Pair {
        return  UniswapV2Pair__factory.connect(this.address, this.provider)
    }

    public get price(): number | null {
        if (this.token0.price && this.token1.price)
            return new BigNumber(this.token0.price).times(this.reserves.token0.toString())
                .plus(new BigNumber(this.token1.price).times(this.reserves.token1.toString()))
                .div(this.totalSupply.toString())
                .toNumber()

        return null
    }

    public async updateBalance(user: string) {
        const rawBalance = (await this.contract.balanceOf(user)).toString()
        
        this.setBalance(rawBalance)

        return this
    }

    public async updateAllowance(user: string, spender: string) {
        const rawAllowance = (await this.contract.allowance(user, spender)).toString()

        this.setAllowance(rawAllowance)

        return this
    }

    public setUnderlyingTokenPrices(token0Price: number, token1Price: number) {
        this.token0.price = token0Price
        this.token1.price = token1Price
    }

    public clone(): TokenPool {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)

        clone.token0 = this.token0.clone()
        clone.token1 = this.token1.clone()

        return clone
    }

    public static async initialize({
        address,
        chain,
        user,
        rpc,
        provider
    }: InitializeParams): Promise<TokenPool> {
        const parsedChain = toExodaChain(chain)
        const rpcProvider = provider || getProvider(parsedChain, rpc)

        const contract = UniswapV2Pair__factory.connect(
            address,
            rpcProvider,
        )

        const [
            token0Address,
            token1Address,
            name,
            decimals,
            totalSupply,
            reserves,
        ] = await Promise.all([
            contract.token0(),
            contract.token1(),
            contract.name(),
            contract.decimals(),
            contract.totalSupply().then(ts => ts.toString()),
            contract.getReserves()
                .then(r => ({
                    token0: r._reserve0.toString(),
                    token1: r._reserve1.toString(),
                })),
        ])

        const [token0, token1] = await Promise.all([
            Token.initialize({ address: token0Address, chain, rpc }),
            Token.initialize({ address: token1Address, chain, rpc }),
        ]) 

        let tokenPool = new TokenPool(
            token0,
            token1,
            reserves,
            parsedChain,
            address,
            name,
            decimals,
            totalSupply,
            rpcProvider,
        )

        if (user)
            tokenPool = await tokenPool.updateBalance(user)

        return tokenPool
    }
}
