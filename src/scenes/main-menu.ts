import type { IScreen } from 'src/interfaces/screen';
import { WindowService } from '../classes/window';
import type { CanvasService } from '../classes/canvas';
import { WHITE } from '../constants/color';
import { positionCenterTextX } from '../helpers/coordinates';

// TODO: Handle the Y position better in the title

export class MainMenu implements IScreen {
  private bgColor: string = '#00001a';
  private title: string = 'The Forgotten Code';
  private menu: string = 'Press Enter to Play!';

  constructor(public canvasService: CanvasService) {
    this.initScreen();
  }

  private initScreen(): void {
    this.canvasService.setContextColor(this.bgColor);
    this.canvasService.setFontSize(50);
  }

  public display(): void {
    this.canvasService.drawRectangule(
      0,
      0,
      WindowService.getWidth,
      WindowService.getHeight,
    );
    this.canvasService.setFontColor(WHITE);
    this.writeTitle();
    this.writeMenu();
  }

  private writeTitle(): void {
    this.canvasService.write(
      this.title,
      positionCenterTextX(this.title, this.canvasService.getFontSize),
      300,
    );
  }

  private writeMenu(): void {
    this.canvasService.setFontSize(25);
    this.canvasService.write(
      this.menu,
      positionCenterTextX(this.menu, this.canvasService.getFontSize),
      400,
    );
  }
}
