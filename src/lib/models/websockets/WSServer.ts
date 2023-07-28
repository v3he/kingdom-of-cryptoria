import { Server } from 'socket.io'
import { createServer } from 'http'

const CORS = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
}

const PORT: number = 9999

export class WSServer {
  private server: Server

  constructor(io: Server) {
    this.server = io
    this.createListeners()
  }

  static async start(): Promise<WSServer> {
    return new WSServer(
      await new Promise((resolve) => {
        const server = createServer()
        server.listen(PORT, () => resolve(new Server(server, CORS)))
      })
    )
  }

  private createListeners(): void {
    this.server.on('connection', () => {
      console.log('new connection')
    })
  }
}
