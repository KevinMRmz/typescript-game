import type { IBgElement } from '../interfaces/bg-elements';
import { CustomImage } from '../classes/custom-image';

export class GrassElement implements IBgElement {
  private grassElements: CustomImage[] = [];

  init(context: CanvasRenderingContext2D): void {
    for (let _ = 1; _ <= 10; _++) {
      for (let i = 1; i <= 4; i++) {
        this.grassElements.push(
          new CustomImage(
            `/assets/background/Alternative Bush ${i}.png`,
            context,
            300,
            100,
          ),
        );
      }
    }
  }

  display(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.grassElements.forEach((el, i) =>
      el.display(context, 40 + 650 * i - x, 500),
    );
  }
}
