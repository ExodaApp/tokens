import { JsonRpcProvider, JsonRpcBatchProvider } from '@ethersproject/providers'
import { Chain, Chains, ChainMap } from './types/chain'
import { chainsInfo } from './constants'

export class Providers {
    private static _defaultProviders: ChainMap<JsonRpcProvider> = {
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

    private static _customProviders: Partial<ChainMap<JsonRpcProvider>> = {}

    public static getProvider(chain: Chain, providerOrRpc?: string | JsonRpcProvider): JsonRpcProvider {
        if (providerOrRpc)
            return Providers.setProvider(chain, providerOrRpc)

        const customProvider = Providers._customProviders[chain]

        return customProvider 
            ? customProvider
            : Providers._defaultProviders[chain]
    }

    public static setProvider(chain: Chain, providerOrRpc: string | JsonRpcProvider): JsonRpcProvider {
        if (!Providers._customProviders[chain])
            Providers._customProviders[chain] = typeof providerOrRpc === 'string'
                ? new JsonRpcBatchProvider(providerOrRpc)
                : providerOrRpc

       return Providers._customProviders[chain]!
    }
}
