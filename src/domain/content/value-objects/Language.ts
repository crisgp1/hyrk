export class Language {
  private static readonly SUPPORTED_LANGUAGES = ['en', 'es'];

  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Language cannot be empty');
    }
    if (!Language.SUPPORTED_LANGUAGES.includes(value)) {
      throw new Error(`Unsupported language: ${value}. Supported languages: ${Language.SUPPORTED_LANGUAGES.join(', ')}`);
    }
  }

  static getSupportedLanguages(): string[] {
    return [...Language.SUPPORTED_LANGUAGES];
  }

  public isEnglish(): boolean {
    return this.value === 'en';
  }

  public isSpanish(): boolean {
    return this.value === 'es';
  }
}