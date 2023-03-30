# @exoda-app/tokens
This library provides an easy way to instaciate `ERC20` and `Uniswap V2 pair` tokens.

## Install
```bash
npm install @exoda-app/tokens
```

## Usage
```ts
import { Token, TokenPool, Chain } from '@exoda-app/tokens'

const token = await Token.init({ address: '0x...', chain: Chains.ETH })

// You can optionally pass a custom rpc for both Token and TokenPool initializers
const poolToken = await TokenPool.init({ address: '0x...', chain: Chains.ETH, rpc: 'https://rpc.ankr.com/eth' })
```

## Models

### BaseToken
Both `Token` and `TokenPool` extends `BaseToken`, therefore the methods and instance variables of this class can invoken from these two classes.

#### Fields
- chain: Chain
- address: string
- name: string
- decimals: bigint
- totalSupply: bigint
- allowance: number | undefined
- balance: number | undefined
- rawBalance: bigint | undefined
- rawAllowance: bigint | undefined
- abstract symbol: string
- abstract price: number | null

#### Methods
- `setBalance(rawBalance: string)`: receives a balance in token basis points, sets `rawBalance`, converts to base 10 and sets `balance`
- `setAllowance(rawAllowance: string)`: receives a allowance in token basis points, sets `rawAllowance`, converts to base 10 and sets `allowance`

### Token
Represents an `ERC20` token. Extends `BaseToken`

#### Methods
- `updateBalance(user: string)`: fetches user balance from contract and call `BaseToken.setBalance` with the value received
- `updateAllowance(user: string)`: fetches user allowance from contract and call `BaseToken.setAllowance` with the value received

### TokenPool
Represents an `Uniswap V2 Pair` token. Extends `BaseToken`

#### Fields
- token0: Token
- token1: Token
- reserves: Reserves

#### Methods
- `updateBalance(user: string)`: fetches user balance from contract and call `BaseToken.setBalance` with the value received
- `updateAllowance(user: string)`: fetches user allowance from contract and call `BaseToken.setAllowance` with the value received

## Supported chains
- ETH
- POLYGON
- BSC
- OPTIMISM
- ARBITRUM


