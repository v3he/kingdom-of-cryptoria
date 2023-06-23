import { writable } from 'svelte/store'
import { GanacheServer } from './GanacheServer'

export const server = writable<GanacheServer>(await GanacheServer.start())
