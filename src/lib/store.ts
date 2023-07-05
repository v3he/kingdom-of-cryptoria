import { writable } from 'svelte/store'
import { Wallet } from '$lib/models/Wallet'
import { Navigation } from './types/Navigation'
import type { Metadata } from './types/Metadata'

export const currentPage = writable<number>(1)
export const isMarketOpen = writable<boolean>(false)
export const wallet = writable<Wallet>(new Wallet())
export const selected = writable<Metadata | null>(null)
export const navigation = writable<Navigation>(Navigation.MY_NFTS)
