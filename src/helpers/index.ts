import { Chain } from '../types/chain'
import { availableChains } from '../constants/chains'

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
    value !== null && value !== undefined;

export const toExodaChain = (chainId: number): Chain => {
    for (const chain of availableChains) {
        if (chain === chainId)
            return chainId as Chain
    }

    throw new Error(`${ chainId } is not available on @exoda-app/tokens.`)
}

