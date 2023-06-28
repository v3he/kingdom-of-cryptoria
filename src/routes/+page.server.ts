import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	return {
		// serverStarted: !!locals.server.signer,
		// accounts: structuredClone(locals.server.accounts)
	}
}) satisfies PageServerLoad
