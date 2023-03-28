import { BigNumber } from 'bignumber.js'
import { oracles, connectors } from './constants/oracles'
import { providers } from './constants/providers'
import { notEmpty } from './helpers'
import { Oracle__factory, Erc20__factory } from './types/contracts'
import { MainnetChain } from './types/chain'

const TEN = new BigNumber(10)

export class PriceService {
    public static async getTokenPrice(tokenAddress: string, chain: MainnetChain): Promise<number | null> {
        const oracleAddress = oracles[chain]

        if (!oracleAddress)
            return null

        const token = Erc20__factory.connect(
            tokenAddress,
            providers[chain],
        )
        const oracle = Oracle__factory.connect(
            oracleAddress,
            providers[chain],
        )

        const rates = (await Promise.all(connectors[chain].map(async connectorAddress => {
            try {
                if (tokenAddress.toLowerCase() === connectorAddress.toString())
                    return null

                const connector = Erc20__factory.connect(
                    connectorAddress,
                    providers[chain],
                )

                const [rate, tokenBasisPoints, connectorBasisPoints] = await Promise.all([
                    oracle.getRate(tokenAddress, connectorAddress, false).then(o => new BigNumber(o.toString())),
                    token.decimals().then(d => TEN.pow(d.toString())),
                    connector.decimals().then(d => TEN.pow(d.toString())),
                ])

                // Converting all rates to 1e18 base
                return rate
                    .times(tokenBasisPoints)
                    .div(connectorBasisPoints)
            } catch (error) {
                return null
            }
        }))).filter(notEmpty)

        if (!rates.length)
            return null

        return rates
            .reduce((acc, curr) => acc.plus(curr.toString()), new BigNumber(0))
            .div(rates.length)
            .div(1e18)
            .toNumber()
    }
}

