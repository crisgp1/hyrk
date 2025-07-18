import { TranslationPort } from '../../application/ports/TranslationPort';
import { TranslationDto } from '../../application/dto/TranslationDto';
import { GetTranslations, GetTranslation, GetSupportedLanguages } from '../../application/use-cases/GetTranslations';

export class TranslationAdapter implements TranslationPort {
  constructor(
    private readonly getTranslationsUseCase: GetTranslations,
    private readonly getTranslationUseCase: GetTranslation,
    private readonly getSupportedLanguagesUseCase: GetSupportedLanguages
  ) {}

  async getTranslations(language: string): Promise<TranslationDto> {
    return await this.getTranslationsUseCase.execute(language);
  }

  async getTranslation(language: string, key: string, fallbackLanguage?: string): Promise<string | null> {
    return await this.getTranslationUseCase.execute({
      language,
      key,
      fallbackLanguage
    });
  }

  async getSupportedLanguages(): Promise<string[]> {
    return await this.getSupportedLanguagesUseCase.execute();
  }
}