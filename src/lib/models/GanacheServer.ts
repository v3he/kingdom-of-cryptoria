import fs from 'fs'
import solc from 'solc'
import path from 'path'
import ganache from 'ganache'

import { NFT } from './NFT'
import { Account } from './Account'
import { Marketplace } from './Marketplace'
import { JsonRpcProvider, JsonRpcSigner, ethers } from 'ethers'

const PORT = 8545
const DB_PATH = './ganache'
const ACCOUNT_KEYS_PATH = `${DB_PATH}/accounts.json`

const defaultOptions = {
  logging: {
    quiet: true
  },
  database: {
    dbPath: DB_PATH
  },
  wallet: {
    deterministic: true,
    defaultBalance: 100,
    accountKeysPath: ACCOUNT_KEYS_PATH
  }
}

export class GanacheServer {
  provider: JsonRpcProvider
  signer: JsonRpcSigner
  accounts: Account[]
  marketplace: Marketplace

  constructor(provider: JsonRpcProvider, signer: JsonRpcSigner, accounts: Account[]) {
    this.provider = provider
    this.signer = signer
    this.accounts = accounts
  }

  static async start(): Promise<GanacheServer> {
    await new Promise((resolve, reject) => {
      const server = ganache.server(defaultOptions)
      server.listen(PORT, (err) => (err ? reject() : resolve(server.provider)))
    })

    const provider = new ethers.JsonRpcProvider(`http://localhost:${PORT}`)
    const signer = await provider.getSigner(0)

    const accountsRaw = JSON.parse(
      fs.readFileSync(ACCOUNT_KEYS_PATH, { encoding: 'utf8', flag: 'r' })
    )

    const accounts = Object.entries(accountsRaw.private_keys)
      .slice(1)
      .map(([pub, priv]) => new Account(pub, priv as string))

    return new GanacheServer(provider, signer, accounts)
  }

  async deploy(): Promise<void> {
    this.marketplace = new Marketplace(this.signer)

    const compileOptions = {
      language: 'Solidity',
      sources: this.marketplace.sources,
      settings: {
        outputSelection: { '*': { '*': ['*'] } }
      }
    }

    const compiledOutput = JSON.parse(
      solc.compile(JSON.stringify(compileOptions), {
        import: (d: string) => ({
          contents: fs.readFileSync(path.join('node_modules', d), { encoding: 'utf8', flag: 'r' })
        })
      })
    )

    if (compiledOutput?.errors?.find((e) => e.severity === 'error')) {
      throw 'error while compiling smart contracts'
    }

    await this.marketplace.deploy(compiledOutput)
    await this.marketplace.mint([
      new NFT('QmcyHKkesUQ3RmLQJQDLst9akCmfroRmcuVr2xemrEUCXz'),
      new NFT('QmdLxKcotujCJJd2H6fkgcMKA9oMNmrU6aU4XwWWELqbgH')
      // new NFT('QmSmYyn9GjCAbaNVeGiK4BbB5m8zhK4Tb4RbbvYwuckHoS'),
      // new NFT('QmW1uegeZFeUMDuAkBM1zzvqoudpkLEezVUSbtsVFEdhoF'),
      // new NFT('QmRw5KRpSkKwdLCWcmxcNCeSZmC5SHWVNY4fCtTRJJdSm1'),
      // new NFT('QmZPWsizZvzavZSC1gZbMW2azJFbFEb1QjhT1r4HX6WdJG'),
      // new NFT('QmRgnj3knBpPGgbyoRAK7vfehuDhFDU9zCtMnn6kwHgN3E'),
      // new NFT('QmbqYyszrYQrZQD6pf56x8aFzdBH6mtvmbB8zrExoGnqaj'),
      // new NFT('QmSupyZe68nWZw5S2ZfB4Pq2sJM6X3gT1CcDAmPPLaeTgF'),
      // new NFT('QmfKA9uEKev1oP9V9XUiPsSGwAqPvNw8wKQXjjBEfkRG7C'),
      // new NFT('QmQYYesXyGRFN5MxAWKX5ULNBAzFJ8w9ShfcAhx1WGGFdj'),
      // new NFT('QmYdyzy2m7H6MGx3PQYLM3yqDvGWgBuXrjY5ARTUy7krma'),
      // new NFT('QmWRPcjtGMsSS9aofAdKmLNfVoCokq4yvbgfUjr2ufDNyM'),
      // new NFT('QmZXE6yGgMXbEcrakqUnre17MNvJ5G8sqwQV7YDkbRxhF2'),
      // new NFT('QmdPRuk6jmpu7vthpf6ugVuJ1rdzFRrdLFJUscbn7YAw3T')
    ])

    await this.marketplace.mint([
      new NFT('QmSmYyn9GjCAbaNVeGiK4BbB5m8zhK4Tb4RbbvYwuckHoS'),
      new NFT('QmW1uegeZFeUMDuAkBM1zzvqoudpkLEezVUSbtsVFEdhoF'),
      new NFT('QmQYYesXyGRFN5MxAWKX5ULNBAzFJ8w9ShfcAhx1WGGFdj'),
      new NFT('QmdPRuk6jmpu7vthpf6ugVuJ1rdzFRrdLFJUscbn7YAw3T'),
      new NFT('QmRw5KRpSkKwdLCWcmxcNCeSZmC5SHWVNY4fCtTRJJdSm1'),
      new NFT('QmYdyzy2m7H6MGx3PQYLM3yqDvGWgBuXrjY5ARTUy7krma'),
      new NFT('QmWRPcjtGMsSS9aofAdKmLNfVoCokq4yvbgfUjr2ufDNyM'),
      new NFT('QmbqYyszrYQrZQD6pf56x8aFzdBH6mtvmbB8zrExoGnqaj')
    ], '0x22d491bde2303f2f43325b2108d26f1eaba1e32b')
  }
}
