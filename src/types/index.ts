export * from './chain'
export * from './contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

export interface InitializeParams {
    address: string,
    chain: number,
    user?: string,
    rpc?: string,
    provider?: JsonRpcProvider
}

