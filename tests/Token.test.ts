import { utils } from 'ethers'
import { Token } from '../src'
import { Chains } from '../src/types/chain'

const UNI_HOLDER = '0x63B53181bDC48A9FBF1d23D461D3CFd82B0aBC83'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

describe('Token', () => {
    describe('Token initialization', () => {
        let token: Token

        beforeAll(async () => {
            console.time('Token initialization')
            token = await Token.initialize({
                address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI Token
                chain: Chains.ETH,
            })
            console.timeEnd('Token initialization')
        })

        it('Should initialize name correctly', () => {
            expect(token.name).toBe('Uniswap')
        }) 

        it('Should initialize symbol correctly', () => {
            expect(token.symbol).toBe('UNI')
        }) 

        it('Should initialize total supply correctly', () => {
            expect(token.totalSupply).toBe('1000000000000000000000000000')
        }) 

        it('Should initialize decimals correctly', () => {
            expect(token.decimals).toBe(18)
        }) 

        it('Should intialize token price', () => {
            expect(token.price).not.toBeNull()
        })

        it('Should update balance correctly', async () => {
            await token.updateBalance(UNI_HOLDER)

            expect(token.balance).toBe(9000000)
            expect(token.rawBalance).toBe('9000000000000000000000000')
        }) 

        it('Should update allowance correctly', async () => {
            await token.updateAllowance(UNI_HOLDER, ZERO_ADDRESS)

            expect(token.allowance).toBe(0)
            expect(token.rawAllowance).toBe('0')
        }) 

        it('Should correctly parse value from token decimals', () => {
            const amount = 10

            const parsedAmount = token.valueFromTokenDecimals(amount)

            expect(parsedAmount).toBe(utils.parseEther(amount.toString()).toString())
        })

        it('Should throw error if chain is not supported', async () => {
            const WRONG_CHAIN = 0

            const initPromise = Token.initialize( {
                address: '0x2538313636975095fa0a97c4bb4e458c5e139c9e',
                chain: WRONG_CHAIN,
            }) 
            await expect(initPromise).rejects.toThrow(`${ WRONG_CHAIN } is not available on @exoda-app/tokens.`)
        })

        it('Should initialize token price as null if chain is testnet', async () => {
            const token = await Token.initialize( {
                address: '0x943552909a7315a79befabed2c542dcbe332addb',
                chain: Chains.AVAX_TESTNET,
            }) 

            expect(token.price).toBeNull
        })

        it('Should use custom rpc', async () => {
            await Token.initialize({
                address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
                chain: Chains.ETH,
                rpc: 'https://eth-rpc.gateway.pokt.network',
            })
        })

        it('Should return an instance of Token when cloned', () => {
            const clone = token.clone()

            expect(clone).toBeInstanceOf(Token)
            expect(clone).not.toBe(token)
        })
    })
})

