import type { WindowSize } from 'src/types/window';
import { WindowService } from './window';
import { BLACK } from '../constants/color';
import type { FontWeight } from '../types/font-weight';
import type { FontOptions } from 'src/interfaces/font-options';

export class CanvasService {
  private readonly canvas: HTMLCanvasElement = document.getElementById(
    'canvas',
  ) as HTMLCanvasElement;

  private readonly context: CanvasRenderingContext2D;

  private fontOptions: FontOptions = {
    fontSize: 16,
    fontFamily: 'consolas',
    fontWeight: 'lighter',
  };

  public constructor() {
    this.context = this.canvas.getContext('2d')!;
    this.initCanvasDefaultConfig();
  }

  private initCanvasDefaultConfig(): void {
    this.setCanvasSize(WindowService.getWindowSize);
    this.setFontColor(BLACK);
    this.setFontOptions(this.fontOptions);
  }

  public get getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public get getFontOptions(): FontOptions {
    return { ...this.fontOptions };
  }

  public get getFontFamily(): string {
    return this.fontOptions.fontFamily;
  }

  public get getFontSize(): number {
    return this.fontOptions.fontSize;
  }

  public get getFontWeight(): FontWeight {
    return this.fontOptions.fontWeight;
  }

  public setCanvasSize(windowSize: WindowSize): void {
    this.canvas.width = windowSize.width;
    this.canvas.height = windowSize.height;
  }

  public setContextColor(color: string): void {
    this.context.fillStyle = color;
  }

  public setFontColor(color: string): void {
    this.context.strokeStyle = color;
  }

  public setFontWeight(fontWeight: FontWeight): void {
    this.fontOptions.fontWeight = fontWeight;
    this.setFont();
  }

  public setFontFamily(fontFamily: string): void {
    this.fontOptions.fontFamily = fontFamily;
    this.setFont();
  }

  public setFontSize(fontSize: number): void {
    this.fontOptions.fontSize = fontSize;
    this.setFont();
  }

  public setFontOptions(fontOptions: FontOptions): void {
    this.fontOptions = fontOptions;
    this.setFont();
  }

  public drawScreen(color: string): void {
    this.setContextColor(color);
    const { width, height } = WindowService.getWindowSize;
    this.drawRectangule(0, 0, width, height);
  }

  public drawRectangule(x: number, y: number, w: number, h: number): void {
    this.context.fillRect(x, y, w, h);
  }

  private setFont(): void {
    this.context.font = `${this.fontOptions.fontWeight} ${this.fontOptions.fontSize}px ${this.fontOptions.fontFamily}`;
  }

  public write(text: string, x: number, y: number): void {
    this.context.strokeText(text, x, y);
  }
}
