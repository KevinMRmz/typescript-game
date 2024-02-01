import type { ISprite } from './sprite';

export interface ICollitionEvent {
  collition: (sprite1: ISprite, sprite2: ISprite) => boolean;
}
