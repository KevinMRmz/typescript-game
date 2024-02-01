export interface IPublisherEvents {
  observers: Map<string, IObserverEvents>;

  addObserver: (key: string, observer: IObserverEvents) => void;
  removeObserver: (key: string) => void;
  notify: (e: Event) => void;
}

export interface IObserverEvents {
  update: (e: Event) => void;
}
