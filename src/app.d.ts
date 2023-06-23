import type { GanacheServer } from '$lib/GanacheServer'

declare global {
	namespace App {
		interface Locals {
			server: GanacheServer
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
