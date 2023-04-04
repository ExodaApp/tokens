import { TokenPool } from '../src'
import { Chains } from '../src/types/chain'

describe('TokenPool', () => {
    let tokenPool: TokenPool

    beforeAll(async () => {
        console.time('Token pool initialization')
        tokenPool = await TokenPool.initialize({
            address: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11', // Uniswap's WETH-DAI
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
        expect(tokenPool.clone()).toBeInstanceOf(TokenPool)
    })
})
