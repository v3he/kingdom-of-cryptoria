import { View } from './types/View'
import { writable } from 'svelte/store'
import { Wallet } from '$lib/models/Wallet'
import { Navigation } from './types/Navigation'
import type { NFT } from './server/db/types/NFT'

export const currentPage = writable<number>(1)
export const isMarketOpen = writable<boolean>(false)
export const wallet = writable<Wallet>(new Wallet())
export const selected = writable<NFT | null>(null)
export const navigation = writable<Navigation>(Navigation.MY_NFTS)

export const view = writable<View>(View.INFO)
