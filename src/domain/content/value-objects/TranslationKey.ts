export class TranslationKey {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Translation key cannot be empty');
    }
    if (!this.isValidKey(value)) {
      throw new Error('Translation key must be in dot notation format (e.g., navbar.home)');
    }
  }

  private isValidKey(key: string): boolean {
    const keyRegex = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)*$/;
    return keyRegex.test(key);
  }
}