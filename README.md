# 🪙 @exoda-app/tokens
`@exoda-app/tokens` is a TypeScript library that provides a simple and convenient way to instantiate `ERC20` and `Uniswap V2 Pair` tokens.

## ⚙ Install
```bash
npm install @exoda-app/tokens
```

## 💻 Usage
```ts
import { Token, TokenPool, Chain } from '@exoda-app/tokens'

const token = await Token.init({ address: '0x...', chain: Chains.ETH })

// You can optionally pass a custom rpc for both Token and TokenPool initializers
const poolToken = await TokenPool.init({ address: '0x...', chain: Chains.ETH, rpc: 'https://rpc.ankr.com/eth' })
```

## 👥 Models

### BaseToken
Both `Token` and `TokenPool` extends `BaseToken`, therefore the methods and instance variables of this class can invoken from these two classes.

#### Fields
- `chain: Chain` - Blockchain network id where the token resides.
- `address: string` - Token's contract address.
- `name: string` - Name of the token.
- `decimals: number` - Number of decimal places used by the token.
- `totalSupply: string` - Total supply of the token.
- `allowance: number | undefined` - Amount of tokens that another address is allowed to spend on behalf of the token owner.
- `balance: number | undefined` - Balance of the token held by the user.
- `rawBalance: string | undefined` - Balance of the token in raw, token base points format.
- `rawAllowance: string | undefined` - Allowance of the token in raw, token base points format.
- `symbol: string` - Token's symbol.
- `price: number | null`- Token's current price, if available.

#### Methods
- `setBalance(rawBalance: string)`: receives a balance in token basis points, sets `rawBalance`, converts to base 10 and sets `balance`
- `setAllowance(rawAllowance: string)`: receives a allowance in token basis points, sets `rawAllowance`, converts to base 10 and sets `allowance`
___

### Token
Represents an `ERC20` token. Extends `BaseToken`

#### Methods
- `updateBalance(user: string)`: fetches user's balance from contract and call `BaseToken.setBalance` with the value received
- `updateAllowance(user: string)`: fetches user's allowance from contract and call `BaseToken.setAllowance` with the value received
___

### TokenPool
Represents an `Uniswap V2 Pair` token. Extends `BaseToken`

#### Fields
- `token0: Token`: First token in the pool
- `token1: Token` Second token in the pool
- reserves:  The reserves of each tokens in the pool

#### Methods
- `updateBalance(user: string)`: fetches user balance from contract and call `BaseToken.setBalance` with the value received
- `updateAllowance(user: string)`: fetches user allowance from contract and call `BaseToken.setAllowance` with the value received
____

## 🔗 Supported chains for token prices
- `ETH`
- `POLYGON`
- `BSC`
- `OPTIMISM`
- `ARBITRUM`


