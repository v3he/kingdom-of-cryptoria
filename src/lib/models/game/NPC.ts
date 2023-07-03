import Konva from "konva"

const width: number = 170
const height: number = 200

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

  isMoving: boolean
  destination: Konva.Circle

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

    const x: number = (stage.width() / 2) - (width / 2)
    const y: number = (stage.height() / 2) - (height - 30) + 100 // 100 is just padding, can be removed

    this.sprite = new Konva.Sprite({
      x, y,
      width, height,
      image: imageObj,
      animation: 'idle',
      animations: animations,
      frameRate: 13,
      frameIndex: 0
    });

    imageObj.onload = () => {
      stage.getLayers()[0].add(this.sprite)
      this.sprite.start()
      this.startRoute()
    }

    imageObj.src = `/images/players/${ trace }/spritesheet.png`;

    this.generateRoute(8)

  }

  getFootPosition() {
    return {
      x: this.sprite.position().x + width / 2,
      y: this.sprite.position().y + height - 30
    }
  }

  setFootPosition(x, y) {
    this.sprite.x(this.sprite.position().x + x)
    this.sprite.y(this.sprite.position().y + y)
  }

  private generateRoute(checkpoints: number): void {
    while (this.points.length < checkpoints) {

      // point should be with a padding of 100px from left and right
      // point should be with a padding of 45% top and 150px bottom
      const potentialPoint = {
        x: 100 + Math.random() * (this.stage.width() - 200),
        y: this.stage.height() * 0.45 + Math.random() * (this.stage.height() * 0.55 - 150)
      }

      const currentPosition = this.getFootPosition();
      const dist = this.calculateDistance(potentialPoint, currentPosition);

      if (dist > GENERATION_RADIUS) {
        const pointCircle = new Konva.Circle({
          ...potentialPoint,
          radius: 5,
          fill: 'yellow',
          stroke: 'black',
          strokeWidth: 4,
        });
        this.points.push(pointCircle);
      }
    }

    this.stage.getLayers()[0].add(...this.points)

  }

  private findNextCheckpoint(): Konva.Circle {
    while (true) {
      const potentialDest = this.points[Math.floor(Math.random() * this.points.length)];
      const currentPosition = this.getFootPosition();

      const dist = this.calculateDistance(potentialDest.position(), currentPosition);

      if (dist > CHECKPOINT_RADIUS) {
        potentialDest.fill('red');
        return potentialDest;
      }
    }
  }

  private async startRoute(): Promise<void> {

    this.isMoving = true;
    this.destination = this.findNextCheckpoint();

    while (this.isMoving) {

      await this.moveTowardsDestination();

      if (this.hasReachedDestination()) {
        this.sprite.animation('idle').start()
        const delay = Math.floor(Math.random() * (45 - 10 + 1) + 10) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        this.destination = this.findNextCheckpoint();
        this.isMoving = !!this.destination;
      }
    }
  }

  // private async startRoute() {

  //   this.destination = this.findNextCheckpoint()

  //   this.isMoving = true

  //   while (this.isMoving) {

  //     await this.moveTowardsDestination()

  //     if (this.hasReachedDestination()) {

  //       this.sprite.animation('idle')
  //       this.sprite.start()

  //       await new Promise(resolve => setTimeout(resolve, 1000));

  //       this.destination = this.findNextCheckpoint();
  //       if (!this.destination) {
  //         this.isMoving = false;
  //       }
  //     }
  //   }
  // }

  private setAnimation(animation: 'idle' | 'walking', scaleX = 1) {
    this.sprite.scaleX(scaleX);
    this.sprite.offsetX(scaleX === -1 ? 170 : 0);
    this.sprite.animation(animation);
    this.sprite.start();
  }

  private moveTowardsDestination(): Promise<void> {
    return new Promise(resolve => {

      const currentPosition = this.getFootPosition();
      const { x, y } = this.destination.position();

      const dx = x - currentPosition.x;
      const dy = y - currentPosition.y;
      const angle = Math.atan2(dy, dx);
      const velocity = 2;

      this.setFootPosition(Math.cos(angle) * velocity, Math.sin(angle) * velocity)

      this.setAnimation('walking', dx < 0 ? -1 : 1);

      setTimeout(() => resolve(), 1000 / 40);

    });
  }

  private hasReachedDestination(): boolean {
    const currentPosition = this.getFootPosition();
    const destinationPosition = this.destination.position();
    return this.calculateDistance(currentPosition, destinationPosition) < 2;
  }

  private calculateDistance(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

}
