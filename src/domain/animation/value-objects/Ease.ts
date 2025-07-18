export class Ease {
  private static readonly VALID_EASES = [
    'linear',
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'power1.out',
    'power2.out',
    'power3.out',
    'power4.out',
    'back.out',
    'elastic.out',
    'bounce.out'
  ];

  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Ease cannot be empty');
    }
    if (!Ease.VALID_EASES.includes(value)) {
      throw new Error(`Invalid ease: ${value}. Valid eases: ${Ease.VALID_EASES.join(', ')}`);
    }
  }

  static getValidEases(): string[] {
    return [...Ease.VALID_EASES];
  }
}