import Konva from "konva"

const GENERATION_RADIUS: number = 200
const CHECKPOINT_RADIUS: number = 150 

const animationMetadata = {
  idle: { frames: 18, width: 170, height: 200 },
  blinking: { frames: 18, width: 170, height: 200 },
  kicking: { frames: 12, width: 170, height: 200 },
  walking: { frames: 24, width: 170, height: 200 },
  slashing: { frames: 12, width: 240, height: 200 }
}

export class NPC {

  stage: Konva.Stage
  sprite: Konva.Sprite
  points: Konva.Circle[] = []

  constructor(trace: string, stage: Konva.Stage) {

    this.stage = stage

    const imageObj = new Image();

    const animations = {}

    Object.entries(animationMetadata).forEach(([key, value], index) => {
      animations[key] = animations[key] || []
      for (let i = 0; i < value.frames; i++) {
        animations[key].push(value.width * i, value.height * index, value.width, value.height)
      }
    })

    this.sprite = new Konva.Sprite({
      x: stage.width() / 2,
      y: stage.height() / 2,
      width: 170,
      height: 200,
      image: imageObj,
      animation: 'idle',
      animations: animations,
      frameRate: 13,
      frameIndex: 0
    });

    imageObj.onload = () => {
      stage.getLayers()[0].add(this.sprite)
      this.sprite.start()
    }

    imageObj.src = `/images/players/${ trace }/spritesheet.png`;

    this.generateRoute(8)
    this.findNextCheckpoint()

  }

  get position() {

    let { x, y } = this.sprite.position()

    x += 170 / 2 // player width
    y += 200 - 30 // player height

    return { x, y }

  }

  // walk(direction) {
  //   switch (direction) {
  //     case 'ArrowRight':
  //       this.sprite.scaleX(1)
  //       this.sprite.animation('walking')
  //       this.sprite.offsetX(0);
  //       this.sprite.x(this.sprite.x() + 2);
  //       break
  //     case 'ArrowLeft':
  //       this.sprite.scaleX(-1)
  //       this.sprite.animation('walking')
  //       this.sprite.offsetX(170);
  //       this.sprite.x(this.sprite.x() - 2);
  //       break
  //     default:
  //       break
  //   }
  //   this.sprite.start();
  // }

  // idle() {
  //   this.sprite.animation('idle');
  //   this.sprite.start();
  // }

  private generateRoute(checkpoints: number): void {
    while (this.points.length < checkpoints) {

      // point should be with a padding of 100px from left and right
      // point should be with a padding of 45% top and 150px bottom
      const potentialPoint = {
        x: 100 + Math.random() * (this.stage.width() - 200),
        y: this.stage.height() * 0.45 + Math.random() * (this.stage.height() * 0.55 - 150)
      }

      const { x, y } = this.position

      if (Math.sqrt(Math.pow(potentialPoint.x - x, 2) + Math.pow(potentialPoint.y - y, 2)) > GENERATION_RADIUS) {
        this.points.push(new Konva.Circle({
          ...potentialPoint,
          radius: 5,
          fill: 'yellow',
          stroke: 'black',
          strokeWidth: 4,
        }))
      }
    }

    this.stage.getLayers()[0].add(...this.points)

  }

  private findNextCheckpoint(): Konva.Circle {
    while (true) {

      const potentialDest = this.points[Math.floor(Math.random() * this.points.length)];

      const potentialDestPosition = potentialDest.position()
      const currentPosition = this.position

      const distance = Math.sqrt(
        Math.pow(potentialDestPosition.x - currentPosition.x, 2) +
        Math.pow(potentialDestPosition.y - currentPosition.y, 2)
      );

      if (distance > CHECKPOINT_RADIUS) {
        potentialDest.fill('red')
        return potentialDest
      }

    }
  }

}
