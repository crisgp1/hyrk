import { Language } from '../value-objects/Language';
import { TranslationKey } from '../value-objects/TranslationKey';
import { TranslationValue } from '../value-objects/TranslationValue';

export class Translation {
  constructor(
    public readonly language: Language,
    public readonly key: TranslationKey,
    public readonly value: TranslationValue
  ) {}

  static create(
    language: string,
    key: string,
    value: string
  ): Translation {
    return new Translation(
      new Language(language),
      new TranslationKey(key),
      new TranslationValue(value)
    );
  }

  public getLanguage(): string {
    return this.language.value;
  }

  public getKey(): string {
    return this.key.value;
  }

  public getValue(): string {
    return this.value.value;
  }
}