import { io, Socket } from 'socket.io-client'

const PORT: number = 9999

export class WSClient {
  private _socket: Socket

  constructor() {
    this._socket = io(`:${PORT}`)
  }

  get socket(): Socket {
    return this._socket
  }
}
