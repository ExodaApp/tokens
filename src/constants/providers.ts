import { JsonRpcProvider } from 'ethers'
import { ChainMap, Chains } from '../types/chain'
import { chainsInfo } from './chains'

export const providers: ChainMap<JsonRpcProvider> = {
    [Chains.ETH]: new JsonRpcProvider(chainsInfo[Chains.ETH].rpc),
    [Chains.AVAX]: new JsonRpcProvider(chainsInfo[Chains.AVAX].rpc),
    [Chains.POLYGON]: new JsonRpcProvider(chainsInfo[Chains.POLYGON].rpc),
    [Chains.BSC]: new JsonRpcProvider(chainsInfo[Chains.BSC].rpc),
    [Chains.OPTIMISM]: new JsonRpcProvider(chainsInfo[Chains.OPTIMISM].rpc),
    [Chains.ARBITRUIM]: new JsonRpcProvider(chainsInfo[Chains.ARBITRUIM].rpc),
}

