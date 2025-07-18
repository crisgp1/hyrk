export class AnimationType {
  private static readonly VALID_TYPES = [
    'fadeIn',
    'fadeOut',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'scale',
    'rotate',
    'float',
    'pulse'
  ];

  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Animation type cannot be empty');
    }
    if (!AnimationType.VALID_TYPES.includes(value)) {
      throw new Error(`Invalid animation type: ${value}. Valid types: ${AnimationType.VALID_TYPES.join(', ')}`);
    }
  }

  static getValidTypes(): string[] {
    return [...AnimationType.VALID_TYPES];
  }
}