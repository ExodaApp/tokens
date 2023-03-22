import { Chain, IChainData, ChainMap, Chains } from '../types/chain'

export const availableChains: Chain[] = Object.values(Chains)

export const chainsInfo: ChainMap<IChainData> = {
    [Chains.ETH]: {
        name: 'Ethereum',
        rpc: 'https://rpc.ankr.com/eth',
        id: Chains.ETH,
        currency: 'ETH',
        explorer: 'https://etherscan.io',
    },

    [Chains.AVAX]: {
        name: 'Avalanche',
        rpc: 'https://rpc.ankr.com/avalanche',
        id: Chains.AVAX,
        currency: 'AVAX',
        explorer: 'https://snowtrace.io',
    },

    [Chains.POLYGON]: {
        name: 'Polygon',
        rpc: 'https://rpc.ankr.com/polygon',
        id: Chains.POLYGON,
        currency: 'MATIC',
        explorer: 'https://polygonscan.com',
    },

    [Chains.BSC]: {
        name: 'BNB Chain',
        rpc: 'https://rpc.ankr.com/bsc',
        id: Chains.BSC,
        currency: 'BNB',
        explorer: 'https://bscscan.com',
    },

    [Chains.OPTIMISM]: {
        name: 'Optimism',
        rpc: 'https://rpc.ankr.com/optimism',
        id: Chains.OPTIMISM,
        currency: 'ETH',
        explorer: 'https://optimistic.etherscan.io/',
    },

    [Chains.ARBITRUIM]: {
        name: 'Arbitruim',
        rpc: 'https://arb1.arbitrum.io/rpc',
        id: Chains.ARBITRUIM,
        currency: 'ETH',
        explorer: 'https://arbiscan.io/',
    },

    // [Chains.BSC_TESTNET]: {
    //     name: 'BNB Chain Testnet',
    //     icon: 'icons-bsc',
    //     rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    //     id: 97,
    //     currency: 'BNB',
    //     explorer: 'https://testnet.bscscan.com',
    // },
    
    // [Chains.POLYGON_TESTNET]: {
    //     name: 'Polygon Testnet',
    //     icon: 'icons-polygon',
    //     rpc: 'https://rpc-mumbai.maticvigil.com',
    //     id: 80001,
    //     currency: 'MATIC',
    //     explorer: 'https://mumbai.polygonscan.com',
    // },

    // [Chains.AVAX_TESTNET]: {
    //     name: 'Avalanche Testnet',
    //     icon: 'icons-avalanche',
    //     rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
    //     id: 43113,
    //     currency: 'AVAX',
    //     explorer: 'https://testnet.snowtrace.io',
    // },

    // [Chains.ETH_TESTNET]: {
    //     name: 'Goerli',
    //     icon: 'icons-ethereum',
    //     rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    //     id: 5,
    //     currency: 'ETH',
    //     explorer: 'https://goerli.etherscan.io',
    // },
}



