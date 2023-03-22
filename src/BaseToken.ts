import { BaseContract } from 'ethers'
import { Chain } from './types/chain'
import { BigNumber } from 'bignumber.js'

export abstract class BaseToken<T extends BaseContract> {
    public allowance?: number
    public balance?: number
    public rawBalance?: bigint
    public rawAllowance?: bigint

    public abstract symbol: string
    public abstract price: number | null

    constructor(
        public chain: Chain,
        public address: string,
        public name: string,
        public decimals: bigint,
        public totalSupply: bigint,
    ) {}

    public setBalance(rawBalance: bigint) {
        this.rawBalance = rawBalance
        this.balance = this.valueToTokenDecimals(rawBalance)
    }

    public setAllowance(rawAllowance: bigint) {
        this.rawAllowance = rawAllowance 
        this.allowance = this.valueToTokenDecimals(rawAllowance)
    }

    public valueToTokenDecimals(rawValue: bigint): number {
        const value = new BigNumber(rawValue.toString())
        const basisPoints = new BigNumber((10n ** this.decimals).toString())

        return value.div(basisPoints).toNumber()
    }

    public abstract get contract(): T
}
