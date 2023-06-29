import { Game } from "./Game"

export class GameFactory {

  private static _players: string[]
  private static _container: HTMLDivElement

  static container(container: HTMLDivElement): typeof GameFactory {
    this._container = container
    return this
  }

  static players(players: string | string[]): typeof GameFactory {
    this._players = Array.isArray(players) ? players : [players]
    return this
  }

  static build(): Game {
    return new Game(this._container, this._players);
  }

}