import Konva from "konva";
import { Player } from "./Player";

export class Game extends Konva.Stage {

  private players: Player[]

  constructor(container: HTMLDivElement, players: string[] = []) {
    super({
			container,
			width: container.clientWidth,
			height: container.clientHeight,
		})
    this.add(new Konva.Layer())
    this.players = players.map(p => new Player(p, this))
  }
}