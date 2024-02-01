import type { ICollitionEvent } from 'src/interfaces/collitions-event';
import type { ISprite } from '../../interfaces/sprite';

export class EnemyCollition implements ICollitionEvent {
  collition(sprite1: ISprite, sprite2: ISprite): boolean {
    if (!(sprite1.getX() + sprite1.getWidth() > sprite2.getX() + 40))
      return false;

    if (!(sprite1.getX() < sprite2.getX() + sprite2.getWidth() - 40))
      return false;

    if (
      !(
        sprite1.getY() + sprite1.getHeight() >
        sprite2.getY() + sprite2.getHeight() / 2
      )
    )
      return false;

    if (
      !(
        sprite1.getY() + sprite1.getHeight() <=
        sprite2.getY() + sprite2.getHeight()
      )
    )
      return false;

    return true;
  }
}
