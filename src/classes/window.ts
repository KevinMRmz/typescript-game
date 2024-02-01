import type { WindowSize } from 'src/types/window';
import type {
  IObserverEvents,
  IPublisherEvents,
} from 'src/interfaces/observer-events';

export class WindowService implements IPublisherEvents {
  private static instance: WindowService | null = null;
  observers = new Map<string, IObserverEvents>();

  private constructor() {
    this.initListeners();
  }

  addObserver(key: string, observer: IObserverEvents): void {
    this.observers.set(key, observer);
  }

  removeObserver(key: string): void {
    this.observers.delete(key);
  }

  notify(e: Event): void {
    this.observers.forEach((observer) => {
      observer.update(e);
    });
  }

  private initListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      this.notify(e);
    });
  }

  public cleanListeners(): void {
    window.removeEventListener('keydown', (_: KeyboardEvent) => {
      console.log('Listener for keydown cleaned');
    });
  }

  public static get getWidth(): number {
    return window.innerWidth;
  }

  public static get getHeight(): number {
    return window.innerHeight;
  }

  public static get getWindowSize(): WindowSize {
    return { width: this.getWidth, height: this.getHeight };
  }

  public static get getInstance(): WindowService {
    if (this.instance === null) {
      this.instance = new WindowService();
    }

    return this.instance;
  }
}
