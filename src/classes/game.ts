import type { IScreen } from 'src/interfaces/screen';

export class Game {
  private currentScreen: IScreen;

  constructor(currentScreen: IScreen) {
    this.currentScreen = currentScreen;
  }

  update(): void {
    this.currentScreen.display();
    window.requestAnimationFrame(this.update.bind(this));
  }

  setScreen(screen: IScreen): void {
    this.currentScreen = screen;
  }
}
