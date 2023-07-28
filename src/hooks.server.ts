import type { Handle } from '@sveltejs/kit'
// import { GanacheServer } from '$lib/models/GanacheServer'
import { WSServer } from '$lib/models/websockets/WSServer'

// let ganacheServer: GanacheServer
let websockets: WSServer

export const handle: Handle = async ({ event, resolve }) => {
  // if (!ganacheServer) {
  //   ganacheServer = await GanacheServer.start()
  //   await ganacheServer.deploy()
  // }

  // event.locals.server = ganacheServer

  if (!websockets) {
    websockets = await WSServer.start()
  }

  return await resolve(event)
}
