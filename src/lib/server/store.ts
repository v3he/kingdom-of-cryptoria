import { writable } from "svelte/store"
import type { WSServer } from "$lib/models/websockets/WSServer"
import type { GanacheServer } from "$lib/models/GanacheServer"

export const websocket = writable<WSServer>()
export const ganacheServer = writable<GanacheServer>()