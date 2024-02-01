export const random = (end: number, start = 0): number => {
  if (start > end) {
    throw new Error('Start number cannot be greater that end');
  }
  return start + Math.round(Math.random() * (end - start));
};
