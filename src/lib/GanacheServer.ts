import fs from 'fs'
import ganache from 'ganache'
import { Account } from './models/Account'

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
}
