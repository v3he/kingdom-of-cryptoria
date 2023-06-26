import { writable } from 'svelte/store'
import { Wallet } from '$lib/models/Wallet'

export const wallet = writable<Wallet>(new Wallet())
