export interface ISize {
  width: number;
  height: number;
}

export interface ICoordinates {
  posX: number;
  posY: number;
}

export interface IHitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ISprite {
  width: number;
  height: number;
  x: number;
  y: number;

  getWidth: () => number;
  getHeight: () => number;
  getSize: () => ISize;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setSize: (size: ISize) => void;
  getX: () => number;
  getY: () => number;
  getPos: () => ICoordinates;
  setX: (x: number) => void;
  setY: (y: number) => void;
  setPosition: (coordinates: ICoordinates) => void;
  display: () => void;
  hitbox: () => IHitbox[] | IHitbox;
}
