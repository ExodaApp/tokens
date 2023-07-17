import { JsonRpcProvider } from '@ethersproject/providers'
import { TokenPool } from '../src'
import { Chains } from '../src/types/chain'

describe('TokenPool', () => {
    let tokenPool: TokenPool

    beforeAll(async () => {
        console.time('Token pool initialization')
        tokenPool = await TokenPool.initialize({
            address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11', // Uniswap's WETH-DAI
            chain: Chains.ETH,
        })
        console.timeEnd('Token pool initialization')
    })

    it('Should calculate the token price', () => {
        expect(tokenPool.price).toBeGreaterThan(0)
    })

    it('Should initialize reserves', () => {
        expect(+tokenPool.reserves.token0).toBeGreaterThan(0)
        expect(+tokenPool.reserves.token1).toBeGreaterThan(0)
    })

    it('Should initialize symbol', () => {
        expect(tokenPool.symbol).toBe('DAI-WETH')
    })

    it('Should set underlying token prices', () => {
        const token0Price = 1.5
        const token1Price = 2.5

        tokenPool.setUnderlyingTokenPrices(token0Price, token1Price)

        expect(tokenPool.token0.price).toBe(token0Price)
        expect(tokenPool.token1.price).toBe(token1Price)
    })

    it('Should return an instnace of TokenPool when cloned', () => {
        const clone = tokenPool.clone()

        expect(clone).toBeInstanceOf(TokenPool)
        expect(clone).not.toBe(tokenPool)
        expect(clone.token0).not.toBe(tokenPool.token0)
        expect(clone.token1).not.toBe(tokenPool.token1)
    })

    it('Should use custom JsonRpcProvider', async () => {
        const rpc = 'https://eth-rpc.gateway.pokt.network'

        class CustomRpcProvider extends JsonRpcProvider {
            send(method: string, params: Array<any>): Promise<any> {
                return super.send(method, params)
            }
        }

        const tokenPool = await TokenPool.initialize({
            address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
            chain: Chains.ETH,
            provider: new CustomRpcProvider(rpc)
        })

        expect(tokenPool).toBeInstanceOf(TokenPool)
    })
})
