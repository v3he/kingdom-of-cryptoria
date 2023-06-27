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

		const marketplace = new Marketplace(this.signer)

		const compileOptions = {
			language: 'Solidity',
			sources: marketplace.sources,
			settings: {
				outputSelection: { '*': { '*': ['*'] } }
			}
		}

		const compiledOutput = JSON.parse(
			solc.compile(JSON.stringify(compileOptions), {
				import: (d: string) => ({ contents: fs.readFileSync(path.join('node_modules', d), { encoding: 'utf8', flag: 'r' }) })
			})
		)

		if (compiledOutput?.errors?.find((e) => e.severity === 'error')) {
			throw 'error while compiling smart contracts'
		}

		await marketplace.deploy(compiledOutput)
		await marketplace.mint([
			new NFT('ipfs://QmYDUaByKHqLk2Mjnc9rMXrkXCWvRsYwFvBRgCoPdmQMXR')
		])

	}

}
