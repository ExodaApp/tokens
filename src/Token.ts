import { BaseToken } from './BaseToken'
import { providers } from './constants/providers'
import { Chain } from './types/chain'
import { Erc20__factory, Erc20 } from './types/contracts'
import { PriceService } from './PriceService'
import { toExodaChain } from './helpers'

export class Token extends BaseToken<Erc20> {
    constructor(
        public symbol: string,
        public price: number | null,
        chain: Chain,
        address: string,
        name: string,
        decimals: number,
        totalSupply: string,
    ) {
        super(chain, address, name, decimals, totalSupply)
    }

    public async updateBalance(user: string): Promise<Token> {
        this.rawBalance = (await this.contract.balanceOf(user)).toString()

        if (!this.rawBalance)
            throw Error('no balance')

        this.balance = this.valueToTokenDecimals(this.rawBalance)

        return this
    }

    public async updateAllowance(user: string, spender: string): Promise<Token> {
        this.rawAllowance = (await this.contract.allowance(user, spender)).toString()

        this.allowance = this.valueToTokenDecimals(this.rawAllowance)

        return this
    }

    public get contract(): Erc20 {
        return Erc20__factory.connect(this.address, providers[this.chain])
    }

    public static async initialize(address: string, chain: number, user?: string): Promise<Token> {
        const parsedChain = toExodaChain(chain)
        const contract = Erc20__factory.connect(address, providers[parsedChain])

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
            PriceService.getTokenPrice(address, parsedChain)
        ])

        let token = new Token(
            symbol,
            price,
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
