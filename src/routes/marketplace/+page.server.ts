import DatabaseManager from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const ssr = false

export const load = (async ({ locals }) => {
  return {
    nft: {
      collection: await locals.server.marketplace.fetchNFTMetadata(DatabaseManager.getAllNFTs())
      // abi: locals.server.marketplace.nft.abi,
      // address: locals.server.marketplace.nft.address
    }
  }
}) satisfies PageServerLoad
