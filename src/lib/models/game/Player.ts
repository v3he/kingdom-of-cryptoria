import Konva from "konva"

const animationMetadata = {
  idle: { frames: 18, width: 170, height: 200 },
  blinking: { frames: 18, width: 170, height: 200 },
  kicking: { frames: 12, width: 170, height: 200 },
  walking: { frames: 24, width: 170, height: 200 },
  slashing: { frames: 12, width: 240, height: 200 }
}

export class Player {

  sprite: Konva.Sprite

  constructor(trace: string, stage: Konva.Stage) {

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

}
