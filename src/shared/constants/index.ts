export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
  VERY_SLOW: 2.0
} as const;

export const ANIMATION_EASES = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  POWER1_OUT: 'power1.out',
  POWER2_OUT: 'power2.out',
  POWER3_OUT: 'power3.out',
  POWER4_OUT: 'power4.out',
  BACK_OUT: 'back.out',
  ELASTIC_OUT: 'elastic.out',
  BOUNCE_OUT: 'bounce.out'
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export const DOMAIN_ERRORS = {
  VALIDATION: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED_ERROR',
  FORBIDDEN: 'FORBIDDEN_ERROR',
  CONFLICT: 'CONFLICT_ERROR',
  INTERNAL: 'INTERNAL_ERROR'
} as const;