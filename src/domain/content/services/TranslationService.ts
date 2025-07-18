import { Translation } from '../entities/Translation';
import { TranslationRepository } from '../repositories/TranslationRepository';
import { Language } from '../value-objects/Language';

export class TranslationService {
  constructor(private readonly translationRepository: TranslationRepository) {}

  async getTranslations(language: string): Promise<Record<string, string>> {
    const translations = await this.translationRepository.getByLanguage(language);
    const translationMap: Record<string, string> = {};
    
    translations.forEach(translation => {
      translationMap[translation.getKey()] = translation.getValue();
    });
    
    return translationMap;
  }

  async getTranslation(language: string, key: string): Promise<string | null> {
    const translation = await this.translationRepository.getTranslation(language, key);
    return translation ? translation.getValue() : null;
  }

  async getTranslationWithFallback(
    language: string, 
    key: string, 
    fallbackLanguage: string = 'en'
  ): Promise<string | null> {
    let translation = await this.getTranslation(language, key);
    
    if (!translation && language !== fallbackLanguage) {
      translation = await this.getTranslation(fallbackLanguage, key);
    }
    
    return translation;
  }

  async getSupportedLanguages(): Promise<string[]> {
    return Language.getSupportedLanguages();
  }

  async validateLanguage(language: string): Promise<boolean> {
    try {
      new Language(language);
      return true;
    } catch {
      return false;
    }
  }
}