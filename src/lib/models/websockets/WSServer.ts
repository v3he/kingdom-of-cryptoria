import { Server } from "socket.io"
import { createServer } from "http"

const PORT: number = 9999

export class WSServer {

  private _io: Server

  constructor(io: Server) {
    this._io = io
    this.createListeners()
  }

  static async start(): Promise<WSServer> {

    const io: Server = await new Promise((resolve) => {
      const server = createServer()
      server.listen(PORT, () => resolve(new Server(server)))
    })

    return new WSServer(io)

  }

  private createListeners(): void {
    this._io.on('connection', (socket) => {
      console.log('new connection ::', socket)
    })
  }

}