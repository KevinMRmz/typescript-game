import { CanvasService } from './classes/canvas';
import { Game } from './classes/game';
import { Level1 } from './levels/level-1';

const bootstrap = () => {
  const game = new Game(new Level1(new CanvasService()));
  game.update();
};

bootstrap();
