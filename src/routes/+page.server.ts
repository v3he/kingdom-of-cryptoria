import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	return {
		accounts: structuredClone(locals.server.accounts)
	}
}) satisfies PageServerLoad
