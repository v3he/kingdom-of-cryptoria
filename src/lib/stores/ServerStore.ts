import { writable } from 'svelte/store'
import { GanacheServer } from '$lib/GanacheServer'

export const server = writable<GanacheServer>(await GanacheServer.start())
