import fs from 'fs'
import solc from 'solc'
import path from 'path'
import ganache from 'ganache'
import { Account } from './Account'

const PORT = 8545
const DB_PATH = './ganache'
const ACCOUNT_KEYS_PATH = `${DB_PATH}/accounts.json`

let contracts = {
	etherstone: { path: './src/lib/contracts/EtherStone.sol' },
	cryptorianrelics: { path: './src/lib/contracts/CryptorianRelics.sol' },
	marketplace: { path: './src/lib/contracts/NFTMarketplace.sol' }
}

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
	owner: Account
	accounts: Account[]

	constructor(owner: Account, accounts: Account[]) {
		this.owner = owner
		this.accounts = accounts
	}

	static async start(): Promise<GanacheServer> {
		await new Promise((resolve, reject) => {
			const server = ganache.server(defaultOptions)
			server.listen(PORT, (err) => (err ? reject() : resolve(server.provider)))
		})

		const accountsRaw = JSON.parse(
			fs.readFileSync(ACCOUNT_KEYS_PATH, { encoding: 'utf8', flag: 'r' })
		)

		const ownerPubKey: string = Object.keys(accountsRaw.addresses)[0]
		const ownerPrivKey: string = accountsRaw.private_keys[ownerPubKey]

		const owner = new Account(ownerPubKey, ownerPrivKey)

		const accounts = Object.entries(accountsRaw.private_keys)
			.slice(1)
			.map(([pub, priv]) => new Account(pub, priv as string))

		return new GanacheServer(owner, accounts)
	}

	compileContracts(): void {
		const input = {
			language: 'Solidity',
			sources: {
				'EtherStone.sol': {
					content: fs.readFileSync(contracts.etherstone.path, { encoding: 'utf8', flag: 'r' })
				},
				'CryptorianRelics.sol': {
					content: fs.readFileSync(contracts.cryptorianrelics.path, { encoding: 'utf8', flag: 'r' })
				},
				'NFTMarketplace.sol': {
					content: fs.readFileSync(contracts.marketplace.path, { encoding: 'utf8', flag: 'r' })
				}
			},
			settings: {
				outputSelection: { '*': { '*': ['*'] } }
			}
		}

		const output = JSON.parse(solc.compile(JSON.stringify(input), { import: this.findImports }))

		console.log(output)
	}

	findImports(dep: any) {
		return {
			contents: fs.readFileSync(path.join('node_modules', dep), { encoding: 'utf8', flag: 'r' })
		}
	}
}
