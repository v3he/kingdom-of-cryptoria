import { writable } from 'svelte/store'
import { Wallet } from '$lib/models/Wallet'
import { Navigation } from './types/Navigation'

export const currentPage = writable<number>(1)
export const wallet = writable<Wallet>(new Wallet())
export const navigation = writable<Navigation>(Navigation.MY_NFTS)
