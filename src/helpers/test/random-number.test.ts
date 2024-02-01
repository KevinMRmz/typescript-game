import { random } from '../random-number';

describe('Verifying the Random Number functionality', () => {
  it('Should return a number between 0 and 10', () => {
    const testEndNumber: number = 10;

    for (let _: number = 0; _ < 10; _++) {
      const n = random(testEndNumber);

      // Number generated should be greater than 0
      expect(n).toBeGreaterThanOrEqual(0);

      // Number generated should be less than 0
      expect(n).toBeLessThanOrEqual(testEndNumber);
    }
  });

  it('Should return a number between 5 and 20', () => {
    const testStartNumber: number = 5;
    const testEndNumber: number = 20;

    for (let _: number = 0; _ < 10; _++) {
      const n = random(testEndNumber, testStartNumber);

      // Number generated should be greater than 0
      expect(n).toBeGreaterThanOrEqual(testStartNumber);

      // Number generated should be less than 0
      expect(n).toBeLessThanOrEqual(testEndNumber);
    }
  });

  it('Should return a number between 50 and 53', () => {
    const testStartNumber: number = 50;
    const testEndNumber: number = 53;

    for (let _: number = 0; _ < 10; _++) {
      const n = random(testEndNumber, testStartNumber);

      // Number generated should be greater than 0
      expect(n).toBeGreaterThanOrEqual(testStartNumber);

      // Number generated should be less than 0
      expect(n).toBeLessThanOrEqual(testEndNumber);
    }
  });

  it('Should throw an error', () => {
    const testStartNumber: number = 4;
    const testEndNumber: number = 2;

    expect(() => random(testEndNumber, testStartNumber)).toThrow(
      'Start number cannot be greater that end',
    );
  });
});
