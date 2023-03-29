import { Contract, utils } from 'ethers'
import { Chain } from './types/chain'
import { ethers } from 'ethers'
import { JsonRpcBatchProvider } from '@ethersproject/providers'

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
        public provider: JsonRpcBatchProvider
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
        let [integer, decimalPlaces] = ethers.utils.formatUnits(rawValue, this.decimals).split('.')

        if (decimalPlaces.length > 4)
            decimalPlaces = decimalPlaces.slice(0, 5)

        return +`${integer}.${decimalPlaces}`
    }

    public valueFromTokenDecimals(value: number): string {
        return utils.parseUnits(value.toString(), this.decimals).toString()
    }

    public abstract get contract(): T
}
