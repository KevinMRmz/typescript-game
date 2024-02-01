import { CustomImage } from '../classes/custom-image';
import type { IBgElement } from '../interfaces/bg-elements';
import { random } from '../helpers/random-number';

export class CloudElements implements IBgElement {
  clouds: CustomImage[] = [];
  private cloudYPositions: number[] = [];

  constructor() {}

  init(context: CanvasRenderingContext2D): void {
    for (let _ = 1; _ <= 8; _++) {
      for (let i = 1; i <= 8; i++) {
        this.clouds.push(
          new CustomImage(
            `/assets/background/cloud ${i}.png`,
            context,
            200,
            90,
          ),
        );
        this.cloudYPositions.push(random(400, 10));
      }
    }
  }

  display(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.clouds.forEach((el, i) =>
      el.display(context, 40 + 400 * i - x, this.cloudYPositions[i]),
    );
  }
}
