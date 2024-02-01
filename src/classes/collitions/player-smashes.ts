import type { ICollitionEvent } from 'src/interfaces/collitions-event';
import type { ISprite } from '../../interfaces/sprite';

export class PlayerSmashes implements ICollitionEvent {
  collition(sprite1: ISprite, sprite2: ISprite): boolean {
    // Verifies the player positioned in x, is greater
    // than the x position of the enemy.
    if (!(sprite1.getX() + sprite1.getWidth() > sprite2.getX() + 35))
      return false;

    // Verifies the player positioned in x, is lower
    // than the x position + its width of the enemy.
    if (!(sprite1.getX() < sprite2.getX() + sprite2.getWidth() - 35))
      return false;

    // Verifies the player positioned in y + its height,
    // is lower than the Y position of the enemy.
    if (!(sprite1.getY() + sprite1.getHeight() < sprite2.getY() + 10))
      return false;

    // Verifies the player Y position is close to the
    // Y enemy position, we already know that its Y position is lower than
    // the enemy, so we must verify it is close to it.
    if (!(sprite1.getY() + sprite1.getHeight() > sprite2.getY() - 5))
      return false;

    // The player is in a position where it can be considered
    // as the player stomps on the enemy
    return true;
  }
}
