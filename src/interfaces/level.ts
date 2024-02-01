import type { CanvasService } from '../classes/canvas';

export interface ILevel {
  pause: () => void;
  init: () => void;
}
