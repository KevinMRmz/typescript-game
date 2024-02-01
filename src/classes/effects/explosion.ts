import { CustomImage } from '../custom-image';

export class Explosion {
  sprites: CustomImage[] = [];
  counter = 0;

  x: number;
  y: number;

  animationFinished: boolean = false;

  constructor(x: number, y: number, context: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;

    this.init(context);
  }

  // TODO: Change the number of all sprites
  init(context: CanvasRenderingContext2D): void {
    for (let index = 1; index <= 28; index++) {
      this.sprites.push(
        new CustomImage(
          `/assets/effects/explosion/Holy Explosion_${index}.png`,
          context,
          80,
          80,
        ),
      );
    }
  }

  display(context: CanvasRenderingContext2D): void {
    this.sprites[this.counter].display(context, this.x, this.y);
    this.counter++;

    if (this.counter >= 27) {
      this.animationFinished = true;
    }
  }
}
