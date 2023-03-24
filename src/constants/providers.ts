import { JsonRpcBatchProvider } from '@ethersproject/providers'
import { ChainMap, Chains } from '../types/chain'
import { chainsInfo } from './chains'

export const providers: ChainMap<JsonRpcBatchProvider> = {
    [Chains.ETH]: new JsonRpcBatchProvider(chainsInfo[Chains.ETH].rpc),
    [Chains.AVAX]: new JsonRpcBatchProvider(chainsInfo[Chains.AVAX].rpc),
    [Chains.POLYGON]: new JsonRpcBatchProvider(chainsInfo[Chains.POLYGON].rpc),
    [Chains.BSC]: new JsonRpcBatchProvider(chainsInfo[Chains.BSC].rpc),
    [Chains.OPTIMISM]: new JsonRpcBatchProvider(chainsInfo[Chains.OPTIMISM].rpc),
    [Chains.ARBITRUIM]: new JsonRpcBatchProvider(chainsInfo[Chains.ARBITRUIM].rpc),
}

