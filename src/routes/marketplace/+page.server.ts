import Database from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const ssr = false

export const load = (({ locals }) => {
  return {
    nft: {
      collection: Database.getAllNFTs(),
      on_sale: Database.getNFTsOnSale()
      // abi: locals.server.marketplace.nft.abi,
      // address: locals.server.marketplace.nft.address
    }
  }
}) satisfies PageServerLoad
