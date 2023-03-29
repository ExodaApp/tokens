import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { Chain, ChainMap, Chains } from '../types/chain'
import { chainsInfo } from './chains'

export const providers: ChainMap<JsonRpcBatchProvider> = {
    [Chains.ETH]: new JsonRpcBatchProvider(chainsInfo[Chains.ETH].rpc),
    [Chains.AVAX]: new JsonRpcBatchProvider(chainsInfo[Chains.AVAX].rpc),
    [Chains.POLYGON]: new JsonRpcBatchProvider(chainsInfo[Chains.POLYGON].rpc),
    [Chains.BSC]: new JsonRpcBatchProvider(chainsInfo[Chains.BSC].rpc),
    [Chains.OPTIMISM]: new JsonRpcBatchProvider(chainsInfo[Chains.OPTIMISM].rpc),
    [Chains.ARBITRUIM]: new JsonRpcBatchProvider(chainsInfo[Chains.ARBITRUIM].rpc),

    [Chains.ETH_TESTNET]: new JsonRpcBatchProvider(chainsInfo[Chains.ETH_TESTNET].rpc),
    [Chains.AVAX_TESTNET]: new JsonRpcBatchProvider(chainsInfo[Chains.AVAX_TESTNET].rpc),
    [Chains.POLYGON_TESTNET]: new JsonRpcBatchProvider(chainsInfo[Chains.POLYGON_TESTNET].rpc),
    [Chains.BSC_TESTNET]: new JsonRpcBatchProvider(chainsInfo[Chains.BSC_TESTNET].rpc),
}

const customProviders: Partial<Record<Chain, JsonRpcBatchProvider>> = {}

export const getProvider = (chain: Chain, rpc?: string): JsonRpcBatchProvider => {
    if (rpc) {
        if (!customProviders[chain])
            customProviders[chain] = new JsonRpcBatchProvider(rpc)

       return customProviders[chain]!
    }

    return providers[chain]
}
