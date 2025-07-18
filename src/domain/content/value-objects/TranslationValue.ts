export class TranslationValue {
  constructor(public readonly value: string) {
    if (value === null || value === undefined) {
      throw new Error('Translation value cannot be null or undefined');
    }
    if (value.length > 1000) {
      throw new Error('Translation value cannot exceed 1000 characters');
    }
  }
}