import { WindowService } from '../classes/window';

// TODO: Create more functions to position the text and different objects

export const positionCenterX = (width: number): number => {
  return WindowService.getWidth / 2 - width / 2;
};

export const positionCenterY = (height: number): number => {
  return WindowService.getHeight / 2 - height / 2;
};

export const positionCenterTextX = (
  text: string,
  currentPx: number,
): number => {
  if (text.length === 0) {
    throw new Error('Text lenght should be greater than 0');
  }
  return WindowService.getWidth / 2 - (text.length * currentPx) / 4;
};

export const positionCenterTextY = (currentPx: number): number => {
  return WindowService.getHeight / 2 - currentPx / 2;
};

export const positionCenterText = (
  text: string,
  currentPx: number,
): {
  centerX: number;
  centerY: number;
} => {
  return {
    centerX: positionCenterTextX(text, currentPx),
    centerY: positionCenterTextY(currentPx),
  };
};

export const positionCenter = (
  width: number,
  height: number,
): { centerX: number; centerY: number } => {
  return {
    centerX: positionCenterX(width),
    centerY: positionCenterY(height),
  };
};
