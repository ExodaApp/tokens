import { BaseToken } from './BaseToken'
import { getProvider } from './constants/providers'
import { Chain, InitializeParams } from './types'
import { Erc20__factory, Erc20 } from './types/contracts'
import { PriceService } from './PriceService'
import { isMainnetChain, toExodaChain } from './helpers'
import { JsonRpcBatchProvider } from '@ethersproject/providers'

export class Token extends BaseToken<Erc20> {
    constructor(
        public symbol: string,
        public price: number | null,
        public logo: string | null,
        chain: Chain,
        address: string,
        name: string,
        decimals: number,
        totalSupply: string,
        provider: JsonRpcBatchProvider
    ) {
        super(chain, address, name, decimals, totalSupply, provider)
    }

    public get contract(): Erc20 {
        return Erc20__factory.connect(this.address, this.provider)
    }

    public async updateBalance(user: string): Promise<Token> {
        const rawBalance = (await this.contract.balanceOf(user)).toString()

        this.setBalance(rawBalance)

        return this
    }

    public async updateAllowance(user: string, spender: string): Promise<Token> {
        const rawAllowance = (await this.contract.allowance(user, spender)).toString()

        this.setAllowance(rawAllowance)

        return this
    }

    public clone(): Token {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }

    public static async initialize({
        address,
        chain,
        user,
        rpc,
    }: InitializeParams): Promise<Token> {
        const parsedChain = toExodaChain(chain)
        const provider = getProvider(parsedChain, rpc)

        const contract = Erc20__factory.connect(
            address,
            provider,
        )

        const [
            name,
            symbol,
            decimals,
            totalSupply,
            price,
        ] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.decimals().then(d => d),
            contract.totalSupply().then(ts => ts.toString()),
            isMainnetChain(parsedChain) ?
                PriceService.getTokenPrice(address, parsedChain)
                : null
        ])

        let token = new Token(
            symbol,
            price,
            null,
            parsedChain,
            address,
            name,
            decimals,
            totalSupply,
            provider,
        )

        if (user)
            token = await token.updateBalance(user)

        return token
    }
}
