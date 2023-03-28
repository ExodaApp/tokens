import { Chain, MainnetChain } from '../types/chain'
import { availableChains, mainnetChains } from '../constants/chains'

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
    value !== null && value !== undefined;

export const toExodaChain = (chainId: number): Chain => {
    for (const chain of availableChains) {
        if (chain === chainId)
            return chainId as Chain
    }

    throw new Error(`${ chainId } is not available on @exoda-app/tokens.`)
}

export const isMainnetChain = (chain: Chain): chain is MainnetChain => {
    for (const mainnetChain of mainnetChains) {
        if (chain === mainnetChain)
            return true
    }

    return false
}
