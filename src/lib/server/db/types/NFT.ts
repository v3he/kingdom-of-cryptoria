import type { Metadata } from '$lib/types/Metadata'

export interface NFT {
  id: number
  owner: string
  ipfs: string
  amount?: number
  metadata?: Metadata
}
