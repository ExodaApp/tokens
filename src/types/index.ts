export * from './chain'
export * from './contracts'

export interface InitializeParams {
    address: string,
    chain: number,
    user?: string,
    rpc?: string,
}

