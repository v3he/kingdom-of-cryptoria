import { Wallet } from '$lib/Wallet'
import { writable } from 'svelte/store'

export const wallet = writable<Wallet>(new Wallet())
