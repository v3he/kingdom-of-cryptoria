import Konva from "konva"

const animationMetadata = {
  idle: { frames: 18, width: 170, height: 200 },
  blinking: { frames: 18, width: 170, height: 200 },
  kicking: { frames: 12, width: 170, height: 200 },
  walking: { frames: 24, width: 170, height: 200 },
  slashing: { frames: 12, width: 240, height: 200 }
}

export class Player {

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

    this.createRandomPoints()

  }

  walk(direction) {
    switch (direction) {
      case 'ArrowRight':
        this.sprite.scaleX(1)
        this.sprite.animation('walking')
        this.sprite.offsetX(0);
        this.sprite.x(this.sprite.x() + 2);
        break
      case 'ArrowLeft':
        this.sprite.scaleX(-1)
        this.sprite.animation('walking')
        this.sprite.offsetX(170);
        this.sprite.x(this.sprite.x() - 2);
        break
      default:
        break
    }
    this.sprite.start();
  }

  idle() {
    this.sprite.animation('idle');
    this.sprite.start();
  }

  createRandomPoints(): void {

    for (let i = 0; i < 7; i++) {

      const x = 100 + Math.random() * (this.stage.width() - 200);
      const y = this.stage.height() * 0.45 + Math.random() * (this.stage.height() * 0.55 - 100);

      this.points.push(new Konva.Circle({
        x, y,
        radius: 5,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
      }))

    }

    this.stage.getLayers()[0].add(...this.points)

  }

}
