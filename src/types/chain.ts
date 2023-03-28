export const ETH = 1
export const ETH_TESTNET = 5
export const AVAX = 43114
export const AVAX_TESTNET = 43113
export const BSC = 56
export const BSC_TESTNET = 97
export const POLYGON = 137
export const POLYGON_TESTNET = 80001
export const OPTIMISM = 10
export const ARBITRUIM = 42161

export const MainnetChains = {
    ETH,
    AVAX,
    BSC,
    POLYGON,
    OPTIMISM,
    ARBITRUIM,
} as const

export const Chains = {
    ...MainnetChains,

    ETH_TESTNET,
    AVAX_TESTNET,
    BSC_TESTNET,
    POLYGON_TESTNET,
} as const

type ChainKey = keyof typeof Chains 
export type Chain = typeof Chains[ChainKey]

type MainnetChainKey = keyof typeof MainnetChains
export type MainnetChain = typeof MainnetChains[MainnetChainKey]

export interface IChainData {
    name: string
    rpc: string
    id: number
    currency: string
    explorer: string
}

export type ChainMap<T> = Record<Chain, T>

export type MainnetChainMap<T> = Record<MainnetChain, T>

export type OptionalChainMap<T> = Partial<Record<Chain, T>>
