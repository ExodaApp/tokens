import { Contract, utils } from 'ethers'
import { Chain } from './types/chain'
import { BigNumber } from 'bignumber.js'

export abstract class BaseToken<T extends Contract> {
    public allowance?: number
    public balance?: number
    public rawBalance?: string
    public rawAllowance?: string

    public abstract symbol: string
    public abstract price: number | null

    constructor(
        public chain: Chain,
        public address: string,
        public name: string,
        public decimals: number,
        public totalSupply: string,
    ) {}

    public setBalance(rawBalance: string) {
        this.rawBalance = rawBalance
        this.balance = this.valueToTokenDecimals(rawBalance)
    }

    public setAllowance(rawAllowance: string) {
        this.rawAllowance = rawAllowance 
        this.allowance = this.valueToTokenDecimals(rawAllowance)
    }

    public valueToTokenDecimals(rawValue: string): number {
        const value = new BigNumber(rawValue.toString())
        const basisPoints = new BigNumber(new BigNumber(10).pow(this.decimals))

        return value.div(basisPoints).toNumber()
    }

    public valueFromTokenDecimals(value: number): string {
        return utils.parseUnits(value.toString(), this.decimals).toString()
    }

    public abstract get contract(): T
}
