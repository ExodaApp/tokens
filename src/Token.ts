import { BaseToken } from './BaseToken'
import { Chain, InitializeParams } from './types'
import { Erc20__factory, Erc20 } from './types/contracts'
import { PriceService } from './PriceService'
import { isMainnetChain, toExodaChain } from './helpers'
import { Providers } from './Providers'

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
    ) {
        super(chain, address, name, decimals, totalSupply)
    }

    public get contract(): Erc20 {
        const provider = Providers.getProvider(this.chain)

        return Erc20__factory.connect(this.address, provider)
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
        provider, // This is the only thing copied to this function
    }: InitializeParams): Promise<Token> {
        const parsedChain = toExodaChain(chain)
        const rpcProvider = Providers.getProvider(parsedChain, rpc || provider)

        const contract = Erc20__factory.connect(
            address,
            rpcProvider,
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
        )

        if (user)
            token = await token.updateBalance(user)

        return token
    }
}
