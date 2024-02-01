import type {
  ICoordinates,
  IHitbox,
  ISize,
  ISprite,
} from '../../interfaces/sprite';
import type { CanvasService } from '../canvas';
import { CustomImage } from '../custom-image';
import { Direction } from '../../enum/direction';
import { FrameCounter } from '../../helpers/frame-counter';
import { positionCenterX } from '../../helpers/coordinates';
import { UserStats } from '../../game-components/user-stats';

/**
 *
 * TODO:
 * This class needs a refactor in the actions implemented
 * like jumping, running, and so on.
 *
 * - Think about a way to separate the actions from the sprite
 */

export class Player implements ISprite {
  width: number;
  height: number;

  x: number;
  y: number;

  sprite: CustomImage[] = [];
  spriteLeft: CustomImage[] = [];
  spriteJump: CustomImage[] = [];
  spriteJumpLeft: CustomImage[] = [];

  spriteCounter: number = 0;
  spriteNumber = 9;

  spriteCounterJumping = 0;
  spriteCounterDivided = 1;
  spriteJumpingNumber = 10;
  jumpingCounter = -20;

  canvasService: CanvasService;

  speed: number = 9;
  currentDirection: Direction = Direction.RIGHT;

  keyPressed!: string;

  isMoving: boolean = false;
  isJumping: boolean = false;

  frames = new FrameCounter();
  userStats: UserStats;

  points = 0;
  lives = 3;

  constructor(
    w: number,
    h: number,
    x: number,
    y: number,
    canvasService: CanvasService,
  ) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.canvasService = canvasService;
    this.userStats = new UserStats(this.canvasService);

    this.init();
  }

  init(): void {
    this.initSprites();
  }

  // TODO: Refactor into different classes of actions
  initSprites(): void {
    for (let i = 0; i < this.spriteNumber; i++)
      this.sprite.push(
        new CustomImage(
          `assets/player/Cyber Prisoner_Run_${i}.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );

    for (let i = 0; i < this.spriteNumber; i++)
      this.spriteLeft.push(
        new CustomImage(
          `assets/player/Cyber Prisoner_Run_${i}-L.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );

    for (let i = 1; i <= this.spriteJumpingNumber; i++)
      this.spriteJump.push(
        new CustomImage(
          `assets/player/jump/Cyber Prisoner_Jump_${i}.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );

    for (let i = 1; i <= this.spriteJumpingNumber; i++)
      this.spriteJumpLeft.push(
        new CustomImage(
          `assets/player/jump/Cyber Prisoner_Jump_${i}-L.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );
  }

  moveEvent(e: KeyboardEvent): void {
    this.isMoving = true;
    this.keyPressed = e.key;
  }

  // TODO: Create a move interface
  move(): void {
    switch (this.keyPressed) {
      case Direction.RIGHT:
        this.moveRight();
        break;
      case Direction.LEFT:
        this.moveLeft();
        break;
      case Direction.UP:
        this.jump();
        break;
      default:
        console.log(this.keyPressed);
    }
  }

  jump(): void {
    this.isJumping = true;
  }

  moveRight(): void {
    this.currentDirection = Direction.RIGHT;

    if (this.getX() >= positionCenterX(this.getWidth())) {
      return;
    }
    this.setX(this.getX() + this.speed);
  }

  moveLeft(): void {
    this.currentDirection = Direction.LEFT;
    if (this.getX() <= 0) {
      return;
    }
    this.setX(this.getX() - this.speed);
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getSize(): ISize {
    return { width: this.getWidth(), height: this.getHeight() };
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setSize(size: ISize): void {
    this.setWidth(size.width);
    this.setHeight(size.height);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getPos(): ICoordinates {
    return { posX: this.getX(), posY: this.getY() };
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setPosition(coordinates: ICoordinates): void {
    this.setX(coordinates.posX);
    this.setY(coordinates.posY);
  }

  display(): void {
    if (this.isMoving) {
      this.move();
      this.setSpriteCounter();

      this.isMoving = false;
    } else {
    }

    if (this.isJumping) {
      switch (this.currentDirection) {
        case Direction.RIGHT:
          this.displayRightJumpSprite();
          break;
        case Direction.LEFT:
          this.displayLeftJumpSprite();
          break;
      }

      this.setSpriteJumpingCounter();
      this.setY(this.jumpingFunction());
    } else {
      switch (this.currentDirection) {
        case Direction.RIGHT:
          this.displayRightSprite();
          break;
        case Direction.LEFT:
          this.displayLeftSprite();
          break;
      }
    }

    this.frames.update();
    this.userStats.setPlayerStats(this.points, this.lives);
    this.userStats.display();
  }

  displayRightJumpSprite(): void {
    this.spriteJump[this.spriteCounterJumping].display(
      this.canvasService.getContext,
      this.x,
      this.y,
    );
  }

  displayLeftJumpSprite(): void {
    this.spriteJumpLeft[this.spriteCounterJumping].display(
      this.canvasService.getContext,
      this.x,
      this.y,
    );
  }

  setSpriteCounter(): void {
    this.spriteCounter = Math.round(this.spriteCounter + 0.6);

    if (this.spriteCounter === this.spriteNumber) {
      this.spriteCounter = 0;
    }
  }

  setSpriteJumpingCounter(): void {
    this.spriteCounterDivided++;
    this.spriteCounterJumping = Math.round(this.spriteCounterDivided / 4);

    if (this.spriteCounterJumping >= this.spriteJumpingNumber) {
      this.spriteCounterJumping = 0;
      this.spriteCounterDivided = 0;
      this.isJumping = false;
    }
  }

  hasStopped(): void {
    if (this.frames.getFrameCounter() >= 3) {
    }
  }

  displayRightSprite(): void {
    this.sprite[this.spriteCounter].display(
      this.canvasService.getContext,
      this.x,
      this.y,
    );
  }

  displayLeftSprite(): void {
    this.spriteLeft[this.spriteCounter].display(
      this.canvasService.getContext,
      this.x,
      this.y,
    );
  }

  jumpingFunction(): number {
    return (
      510 -
      (150 -
        Math.pow(this.jumpingCounter / 2 + this.spriteCounterDivided / 2, 2) *
          1.5)
    );
  }

  smashJumping(): void {
    this.spriteCounterDivided = 6;
  }

  startOver(): void {
    this.x = 50;
    this.y = 510;
    this.lives--;
  }

  hitbox(): IHitbox | IHitbox[] {
    // TODO: Change the number of "plus" to calculate an accurate value for hitbox
    return [];
  }
}
