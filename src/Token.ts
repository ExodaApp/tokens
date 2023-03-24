import { BaseToken } from './BaseToken'
import { providers } from './constants/providers'
import { Chain } from './types/chain'
import { Erc20__factory, Erc20 } from './types/contracts'
import { PriceService } from './PriceService'

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

    public get contract(): Erc20 {
        return Erc20__factory.connect(this.address, providers[this.chain])
    }

    public static async initialize(address: string, chain: Chain): Promise<Token> {
        const contract = Erc20__factory.connect(address, providers[chain])

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
            PriceService.getTokenPrice(address, chain)
        ])

        return new Token(
            symbol,
            price,
            chain,
            address,
            name,
            decimals,
            totalSupply,
        )
    }
}
