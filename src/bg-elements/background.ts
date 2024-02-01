/**
 *
 * TODO:
 *
 * - Create a full bg library, it will be easier to handle all the bg elements in the game.
 * - better implementation of each bg class
 * - this class work as an global library that hanldes all bg class
 *
 */

import type { IBgElement } from '../interfaces/bg-elements';
import { CloudElements } from './cloud';
import { GrassElement } from './grass';
import { GreenHouseElements } from './green-houses';
import { SunElement } from './sun';
import { LandElement } from './land';

export class BackGround {
  private bgElements: IBgElement[] = [];

  constructor(private context: CanvasRenderingContext2D) {
    this.initElements();
    this.init();
  }

  init(): void {
    this.bgElements.forEach((el) => el.init(this.context));
  }

  initElements(): void {
    this.bgElements = [
      new SunElement(),
      new CloudElements(),
      new GreenHouseElements(),
      new GrassElement(),
      new LandElement(),
    ];
  }

  display(back: number): void {
    this.bgElements.forEach((element, i) =>
      element.display(this.context, back, 0),
    );
  }
}
