import { TokenPool } from '../src'
import { Chains } from '../src/types/chain'

describe('TokenPool', () => {
    let tokenPool: TokenPool

    beforeAll(async () => {
        console.time('Token pool initialization')
        tokenPool = await TokenPool.initialize(
            '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11', // Uniswap's WETH-DAI
            Chains.ETH,
        )
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
})
