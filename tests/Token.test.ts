import { Token } from '../src'
import { Chains } from '../src/types/chain'

const UNI_HOLDER = '0x63B53181bDC48A9FBF1d23D461D3CFd82B0aBC83'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Token', () => {
    let token: Token

    beforeAll(async () => {
        console.time('Token initialization')
        token = await Token.init(
            '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI Token
            Chains.ETH,
        )
        console.timeEnd('Token initialization')
    })

    it('Should initialize name correctly', () => {
        expect(token.name).toBe('Uniswap')
    }) 

    it('Should initialize symbol correctly', () => {
        expect(token.symbol).toBe('UNI')
    }) 

    it('Should initialize total supply correctly', () => {
        expect(token.totalSupply).toBe(1000000000000000000000000000n)
    }) 

    it('Should initialize decimals correctly', () => {
        expect(token.decimals).toBe(18n)
    }) 

    it('Should intialize token price', () => {
        expect(token.price).not.toBeNull()
    })

    it('Should update balance correctly', async () => {
        await token.updateBalance(UNI_HOLDER)

        expect(token.balance).toBe(9000000)
        expect(token.rawBalance).toBe(9000000000000000000000000n)
    }) 

    it('Should update allowance correctly', async () => {
        await token.updateAllowance(UNI_HOLDER, ZERO_ADDRESS)

        expect(token.allowance).toBe(0)
        expect(token.rawAllowance).toBe(0n)
    }) 
})

