export class CustomImage {
  private _image: HTMLImageElement;
  private _loaded: boolean = false;

  constructor(
    src: string,
    context: CanvasRenderingContext2D,
    width?: number,
    height?: number,
  ) {
    this._image = new Image(width, height);
    this._image.src = src;
    this._initImage(context);
  }

  private _initImage(context: CanvasRenderingContext2D): void {
    this._image.addEventListener('load', () => {
      context.drawImage(this._image, 0, 0, this.getWidth, this.getHeight);
    });
  }

  public get getWidth(): number {
    return this._image.width;
  }

  public get getHeight(): number {
    return this._image.height;
  }

  public setWidth(width: number): void {
    if (width < 0) {
      throw new Error('Cannot assign negative number for width');
    }

    this._image.width = width;
  }

  public setHeight(height: number): void {
    if (height < 0) {
      throw new Error('Cannot assign negative number for height');
    }

    this._image.height = height;
  }

  public setSize(width: number, height: number): void {
    this.setWidth(width);
    this.setHeight(height);
  }

  public display(
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number,
  ): void {
    context.drawImage(this._image, xPos, yPos, this.getWidth, this.getHeight);
  }
}
