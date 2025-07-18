export class Duration {
  constructor(public readonly value: number) {
    if (value < 0) {
      throw new Error('Duration cannot be negative');
    }
    if (value > 10) {
      throw new Error('Duration cannot exceed 10 seconds');
    }
  }

  public toMilliseconds(): number {
    return this.value * 1000;
  }
}