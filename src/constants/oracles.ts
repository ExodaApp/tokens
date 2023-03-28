import { MainnetChainMap, Chains } from "../types/chain"

export const oracles: MainnetChainMap<string> = {
    [Chains.ETH]: '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb',
    [Chains.BSC]: '0xfbD61B037C325b959c0F6A7e69D8f37770C2c550',
    [Chains.POLYGON]: '0x7F069df72b7A39bCE9806e3AfaF579E54D8CF2b9',
    [Chains.OPTIMISM]: '0x11DEE30E710B8d4a8630392781Cc3c0046365d4c',
    [Chains.ARBITRUIM]: '0x735247fb0a604c0adC6cab38ACE16D0DbA31295F',
    [Chains.AVAX]: '0xBd0c7AaF0bF082712EbE919a9dD94b2d978f79A9',
} 

export const connectors: MainnetChainMap<string[]> = {
    [Chains.ETH]: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
        '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
        '0x4fabb145d64652a948d72533023f6e7a623c7c53', // BUSD
    ],
    [Chains.BSC]: [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
        '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
        '0x55d398326f99059ff775485246999027b3197955', // USDT
    ],
    [Chains.POLYGON]: [
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
        '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
        '0x9c9e5fd8bbc25984b178fdce6117defa39d2db39', // BUSD
    ],
    [Chains.OPTIMISM]: [
        '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58', // USDT
        '0x7f5c764cbc14f9669b88837ca1490cca17c31607', // USDC
        '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
        '0x9c9e5fd8bbc25984b178fdce6117defa39d2db39', // BUSD
    ],
    [Chains.ARBITRUIM]: [
        '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', // USDT
        '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // USDC
        '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', // DAI
        '0x4d15a3a2286d883af0aa1b3f21367843fac63e07', // TRUST USD
    ],
    [Chains.AVAX]: [
        '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC 
        '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7', // USDT
        '0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39', // BUSD
        '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', // DAI
    ],
}

