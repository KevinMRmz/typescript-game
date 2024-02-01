import type { CanvasService } from '../classes/canvas';
import type { IComponent } from '../interfaces/components';
import { WHITE } from '../constants/color';

export class UserStats implements IComponent {
  points: number = 0;
  lives: number = 0;

  constructor(private canvasService: CanvasService) {}

  setPlayerStats(points: number, lives: number): void {
    this.points = points;
    this.lives = lives;
  }

  display(): void {
    this.canvasService.setFontColor(WHITE);
    this.canvasService.setFontSize(30);

    this.canvasService.write(
      `Points: ${this.points.toString().padStart(10, '0')}`,
      30,
      30,
    );

    this.canvasService.write(`Lives: ${this.lives}`, 30, 60);
  }
}
