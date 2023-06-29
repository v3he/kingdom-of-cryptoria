import Konva from "konva";
import { NPC } from "./NPC";

export class Game extends Konva.Stage {

  private npcs: NPC[]

  constructor(container: HTMLDivElement, players: string[] = []) {
    super({
			container,
			width: container.clientWidth,
			height: container.clientHeight,
		})
    this.add(new Konva.Layer())
    this.npcs = players.map(p => new NPC(p, this))
  }
}