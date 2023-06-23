import type { Wallet } from '$lib/Wallet'
import type { GanacheServer } from '$lib/GanacheServer'

declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider
	}
	namespace App {
		interface Locals {
			wallet: Wallet
			server: GanacheServer
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
