import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {

	return {
		serverStarted: !!locals.server.owner,
		accounts: structuredClone(locals.server.accounts)
	}
}) satisfies PageServerLoad
