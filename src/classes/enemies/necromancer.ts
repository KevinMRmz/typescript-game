import type {
  ICoordinates,
  IHitbox,
  ISize,
  ISprite,
} from '../../interfaces/sprite';
import type { CanvasService } from '../canvas';
import { CustomImage } from '../custom-image';

export class Necromancer implements ISprite {
  width: number = 70;
  height: number = 70;
  x: number;
  y: number;

  spritesRight: CustomImage[] = [];
  spritesLeft: CustomImage[] = [];
  spriteCounter: number = 0;
  spriteShow: number = 0;

  // TODO: Ai enemies should be in a different class
  counterMov = 0;
  showSpritesLeft = true;

  constructor(private canvasService: CanvasService, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.init();
  }

  init(): void {
    this.initSprites();
  }

  initSprites(): void {
    for (let index = 1; index <= 4; index++) {
      this.spritesRight.push(
        new CustomImage(
          `assets/enemies/first-enemy/Necromancer_Idle_${index}.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );
    }

    for (let index = 1; index <= 4; index++) {
      this.spritesLeft.push(
        new CustomImage(
          `assets/enemies/first-enemy/Necromancer_Idle_${index}-L.png`,
          this.canvasService.getContext,
          this.width,
          this.height,
        ),
      );
    }
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
    this.update();

    if (this.showSpritesLeft) {
      this.spritesLeft[this.spriteShow].display(
        this.canvasService.getContext,
        this.x,
        this.y,
      );
    } else {
      this.spritesRight[this.spriteShow].display(
        this.canvasService.getContext,
        this.x,
        this.y,
      );
    }

    this.updateSpriteCounter();
  }

  update(): void {
    this.counterMov++;
    if (this.counterMov < 50) {
      this.x -= 5;
    } else {
      this.showSpritesLeft = false;
      this.x += 5;

      if (this.counterMov >= 100) {
        this.counterMov = 0;
        this.showSpritesLeft = true;
      }
    }
  }

  updateSpriteCounter(): void {
    this.spriteCounter++;
    this.spriteShow = Math.round(this.spriteCounter / 8);

    if (this.spriteShow >= 4) {
      this.spriteCounter = 0;
      this.spriteShow = 0;
    }
  }

  hitbox(): IHitbox | IHitbox[] {
    // TODO: hitbox code
    return [];
  }
}
