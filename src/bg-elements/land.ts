import type { IBgElement } from '../interfaces/bg-elements';
import { CustomImage } from '../classes/custom-image';
import { WindowService } from '../classes/window';

export class LandElement implements IBgElement {
  private land: CustomImage[] = [];

  init(context: CanvasRenderingContext2D): void {
    for (let _ = 0; _ < 100; _++) {
      this.land.push(
        new CustomImage(
          'assets/background-images/land.jpg',
          context,
          WindowService.getWidth,
          250,
        ),
      );
    }
  }

  display(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.land.forEach((el, i) =>
      el.display(context, i * WindowService.getWidth - x, 630),
    );
  }
}
