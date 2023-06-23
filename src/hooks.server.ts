import { get } from 'svelte/store'
import { server } from '$lib/Store'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.server = get(server)
	return await resolve(event)
}
