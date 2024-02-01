export class FrameCounter {
  FPS = 60;
  frameCounter = 0;

  mapCounters = new Map<string, number>();

  constructor() {}

  getFrameCounter(): number {
    return this.frameCounter;
  }

  setFrameCounter(counter: number): void {
    this.frameCounter = counter;
  }

  update(): void {
    if (this.frameCounter >= this.FPS) {
      this.resetCounter();
    }

    this.frameCounter++;
  }

  resetCounter(): void {
    this.frameCounter = 0;
  }
}
