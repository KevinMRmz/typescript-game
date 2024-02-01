export interface IBgElement {
  init: (context: CanvasRenderingContext2D) => void;
  display: (context: CanvasRenderingContext2D, x: number, y: number) => void;
}
