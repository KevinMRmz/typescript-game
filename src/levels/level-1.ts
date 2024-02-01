import type { CanvasService } from 'src/classes/canvas';
import type { ILevel } from '../interfaces/level';
import type { IScreen } from '../interfaces/screen';
import { WindowService } from '../classes/window';
import { CustomImage } from '../classes/custom-image';
import type { IObserverEvents } from 'src/interfaces/observer-events';
import { Player } from '../classes/player/player';
import { SKY } from '../constants/color';
import { positionCenterX } from '../helpers/coordinates';
import { Necromancer } from '../classes/enemies/necromancer';
import { PlayerSmashes } from '../classes/collitions/player-smashes';
import { Explosion } from '../classes/effects/explosion';
import { EnemyCollition } from '../classes/collitions/enemy-collition';

// TODO: Delete all bg images implementations
import { BackGround } from '../bg-elements/background';

export class Level1 implements ILevel, IScreen, IObserverEvents {
  private rockGround: CustomImage[] = [];

  private player!: Player;

  private smash = new PlayerSmashes();
  private enemyCollition = new EnemyCollition();
  private effects: Explosion[] = [];

  private bg: BackGround;
  private levelAdvance: number = 0;
  private necromancer: Necromancer[] = [];

  constructor(public canvasService: CanvasService) {
    this.bg = new BackGround(this.canvasService.getContext);
    this.init();
  }

  update(e: Event): void {
    this.player.moveEvent(e as KeyboardEvent);

    if (this.player.getX() >= positionCenterX(this.player.getWidth())) {
      this.levelAdvance += this.player.speed;
    }
  }

  init(): void {
    // TODO: Fix sizes
    this.initPlayer();
    this.initGround();
    this.initObserver();
    this.initEnemies();
  }

  private initPlayer(): void {
    this.player = new Player(100, 90, 50, 510, this.canvasService);
  }

  private initEnemies(): void {
    this.initNecromancerEnemies();
  }

  private initNecromancerEnemies(): void {
    this.necromancer.push(new Necromancer(this.canvasService, 500, 530));
  }

  private initGround(): void {
    for (let i = 0; i < 400; i++) {
      this.rockGround.push(
        new CustomImage(
          '/assets/background-images/stone.png',
          this.canvasService.getContext,
          50,
          30,
        ),
      );
    }
  }

  private initObserver(): void {
    WindowService.getInstance.addObserver(Level1.name, this);
  }

  pause(): void {}
  display(): void {
    this.displaySky();
    this.bg.display(this.levelAdvance);
    this.displayRock();

    // Enemies
    this.displayNecromancerEnemies();
    this.player.display();

    this.collitions();

    this.displayEffects();
  }

  //TODO: Change the way this function is implemented.
  collitions(): void {
    this.necromancer.forEach((enemy, i) => {
      if (this.smash.collition(this.player, enemy)) {
        this.player.smashJumping();
        this.necromancer.splice(i, 1);
        this.player.points += 100;
        this.effects.push(
          new Explosion(
            enemy.getX(),
            enemy.getY(),
            this.canvasService.getContext,
          ),
        );
      }
    });

    this.necromancer.forEach((enemy, i) => {
      if (this.enemyCollition.collition(this.player, enemy)) {
        this.player.startOver();
      }
    });

    this.effects.forEach((effect, i) => {
      if (effect.animationFinished) {
        this.effects.splice(i, 1);
      }
    });
  }

  displayEffects(): void {
    this.effects.forEach((effect, i) => {
      effect.display(this.canvasService.getContext);
    });
  }

  displayNecromancerEnemies(): void {
    this.necromancer.forEach((el, i) => el.display());
  }

  displaySky(): void {
    this.canvasService.drawScreen(SKY);
  }

  displayRock(): void {
    this.rockGround.forEach((rock, i) =>
      rock.display(
        this.canvasService.getContext,
        i * 50 - this.levelAdvance,
        600,
      ),
    );
  }
}
