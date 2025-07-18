import { Translation } from '../entities/Translation';

export interface TranslationRepository {
  getByLanguage(language: string): Promise<Translation[]>;
  getByKey(key: string): Promise<Translation[]>;
  getTranslation(language: string, key: string): Promise<Translation | null>;
  save(translation: Translation): Promise<void>;
  delete(language: string, key: string): Promise<void>;
}