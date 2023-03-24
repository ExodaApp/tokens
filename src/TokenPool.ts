import { BigNumber } from 'bignumber.js'
import { BaseToken } from './BaseToken'
import { Token } from './Token'
import { UniswapV2Pair, UniswapV2Pair__factory } from './types/contracts'
import { Chain } from './types/chain'
import { providers } from './constants/providers'

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
    ) {
        super(chain, address, name, decimals, totalSupply)
    }

    public get symbol(): string {
        return `${this.token0.symbol}-${this.token1.symbol}`
    }

    public get contract(): UniswapV2Pair {
        return UniswapV2Pair__factory.connect(this.address, providers[this.chain])
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
        this.rawBalance = (await this.contract.balanceOf(user)).toString()

        if (!this.rawBalance)
            throw Error('no balance')

        this.balance = this.valueToTokenDecimals(this.rawBalance)
    }

    public async updateAllowance(user: string, spender: string) {
        this.rawAllowance = (await this.contract.allowance(user, spender)).toString()

        this.allowance = this.valueToTokenDecimals(this.rawAllowance)
    }

    public static async initialize(address: string, chain: Chain): Promise<TokenPool> {
        const contract = UniswapV2Pair__factory.connect(address, providers[chain])

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
            Token.initialize(token0Address, chain),
            Token.initialize(token1Address, chain),
        ]) 

        return new TokenPool(
            token0,
            token1,
            reserves,
            chain,
            address,
            name,
            decimals,
            totalSupply,
        )
    }
}
