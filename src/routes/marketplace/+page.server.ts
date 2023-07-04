import type { PageServerLoad } from './$types'

export const ssr = false

export const load = (({ locals }) => {
  return {
    nft: {
      abi: locals.server.marketplace.nft.abi,
      address: locals.server.marketplace.nft.address
    }
  }
}) satisfies PageServerLoad
