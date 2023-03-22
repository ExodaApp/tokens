import { PoolToken } from '../src'
import { Chains } from '../src/types/chain'

describe('PoolToken', () => {
    let poolToken: PoolToken

    beforeAll(async () => {
        console.time('Pool token initialization')
        poolToken = await PoolToken.init(
            '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11', // Uniswap's WETH-DAI
            Chains.ETH,
        )
        console.timeEnd('Pool token initialization')
    })

    it('Should calculate the token price', () => {
        expect(poolToken.price).toBeGreaterThan(0)
    })

    it('Should initialize reserves', () => {
        expect(poolToken.reserves.token0).toBeGreaterThan(0n)
        expect(poolToken.reserves.token1).toBeGreaterThan(0n)
    })

    it('Should initialize symbol', () => {
        expect(poolToken.symbol).toBe('DAI-WETH')
    })
})
