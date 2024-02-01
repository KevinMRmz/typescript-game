import type { IBgElement } from '../interfaces/bg-elements';
import { CustomImage } from '../classes/custom-image';

export class GreenHouseElements implements IBgElement {
  houseElements: CustomImage[] = [];

  init(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < 30; i++) {
      this.houseElements.push(
        new CustomImage(
          `/assets/background/Green house 1.png`,
          context,
          300,
          200,
        ),
      );

      this.houseElements.push(
        new CustomImage(
          `/assets/background/Green house 2.png`,
          context,
          300,
          200,
        ),
      );
    }
  }

  display(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.houseElements.forEach((el, i) =>
      el.display(context, 350 + 350 * i - x, 400),
    );
  }
}
