import { TranslationService } from '../../domain/content/services/TranslationService';
import { TranslationDto, TranslationRequestDto } from '../dto/TranslationDto';

export class GetTranslations {
  constructor(private readonly translationService: TranslationService) {}

  async execute(language: string): Promise<TranslationDto> {
    const translations = await this.translationService.getTranslations(language);
    
    return {
      language,
      translations
    };
  }
}

export class GetTranslation {
  constructor(private readonly translationService: TranslationService) {}

  async execute(request: TranslationRequestDto): Promise<string | null> {
    return await this.translationService.getTranslationWithFallback(
      request.language,
      request.key,
      request.fallbackLanguage
    );
  }
}

export class GetSupportedLanguages {
  constructor(private readonly translationService: TranslationService) {}

  async execute(): Promise<string[]> {
    return await this.translationService.getSupportedLanguages();
  }
}