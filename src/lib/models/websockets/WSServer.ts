import { Server } from 'socket.io'
import { createServer } from 'http'
import { Channel } from '$lib/types/Channel'
import type { SetupNotification } from '$lib/types/SetupNotification'

const CORS = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
}

const PORT: number = 9999

export class WSServer {

  private _server: Server
  private static instance: WSServer | null = null

  private constructor(server: Server) {
    this._server = server
  }

  static getInstance(): WSServer | null {
    return WSServer.instance
  }

  public static async start(): Promise<WSServer> {
    if (!WSServer.instance) {
      WSServer.instance = new WSServer(
        await new Promise((resolve) => {
          const server = createServer()
          server.listen(PORT, () => resolve(new Server(server, CORS)))
        })
      )
    }
    return WSServer.instance
  }

  sendSetupNotification(notification: SetupNotification): void {
    this._server.emit(Channel.SETUP, notification)
  }

}
