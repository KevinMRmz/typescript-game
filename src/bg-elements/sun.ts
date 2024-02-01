import type { IBgElement } from '../interfaces/bg-elements';
import { CustomImage } from '../classes/custom-image';
import { positionCenterX } from '../helpers/coordinates';

export class SunElement implements IBgElement {
  sun!: CustomImage;

  init(context: CanvasRenderingContext2D): void {
    this.sun = this.sun = new CustomImage(
      'assets/background/Sun.png',
      context,
      100,
      100,
    );
  }

  display(context: CanvasRenderingContext2D, x: number, y: number): void {
    this.sun.display(context, positionCenterX(100), 150);
  }
}
