import { TranslationDto } from '../dto/TranslationDto';

export interface TranslationPort {
  getTranslations(language: string): Promise<TranslationDto>;
  getTranslation(language: string, key: string, fallbackLanguage?: string): Promise<string | null>;
  getSupportedLanguages(): Promise<string[]>;
}