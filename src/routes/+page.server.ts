import type { PageServerLoad } from './$types'
import { WSServer } from '$lib/models/websockets/WSServer';
import { GanacheServer } from '$lib/models/GanacheServer';

export const ssr = false

export const load = (async () => {

  const websocket = await WSServer.start()

  if(!websocket) {
    return {
      error: 'unable to start websocket server'
    }
  }

  const ganache = await GanacheServer.start()

  if(!ganache) {
    return {
      error: 'unable to start ganache server'
    }
  }

  return {
    // token: locals.server.marketplace.currency.address
    // serverStarted: !!locals.server.signer,
    // accounts: structuredClone(locals.server.accounts)
  }
}) satisfies PageServerLoad
