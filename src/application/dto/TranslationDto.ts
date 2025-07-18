export interface TranslationDto {
  language: string;
  translations: Record<string, string>;
}

export interface TranslationRequestDto {
  language: string;
  key: string;
  fallbackLanguage?: string;
}