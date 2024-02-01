import type { CanvasService } from '../classes/canvas';

export interface IScreen {
  display: () => void;
  canvasService: CanvasService;
}
