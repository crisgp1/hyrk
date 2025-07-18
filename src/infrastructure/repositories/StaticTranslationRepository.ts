import { Translation } from '../../domain/content/entities/Translation';
import { TranslationRepository } from '../../domain/content/repositories/TranslationRepository';

interface TranslationData {
  [key: string]: any;
}

export class StaticTranslationRepository implements TranslationRepository {
  private translations: Translation[] = [];

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    const enTranslations = {
      'navbar.services': 'Services',
      'navbar.clients': 'Clients',
      'navbar.about': 'About',
      'navbar.contact': 'Contact',
      'navbar.getStarted': 'Get Started',
      'home.title': 'hyrk.io',
      'home.subtitle1': 'Software development accelerator',
      'home.subtitle2': 'and innovation hub',
      'home.startYourProject': 'Start Your Project',
      'home.viewOurWork': 'View Our Work',
      'home.trustedByLeaders': 'Trusted by Industry Leaders',
      'home.ourExpertise': 'Our Expertise',
      'home.automotiveLuxury': 'Automotive Luxury',
      'home.financialServices': 'Financial Services',
      'home.clientTracking': 'Client Tracking',
      'home.digitalTransformation': 'Digital Transformation'
    };

    const esTranslations = {
      'navbar.services': 'Servicios',
      'navbar.clients': 'Clientes',
      'navbar.about': 'Nosotros',
      'navbar.contact': 'Contacto',
      'navbar.getStarted': 'Comenzar',
      'home.title': 'hyrk.io',
      'home.subtitle1': 'Acelerador de software',
      'home.subtitle2': 'creador de ideas',
      'home.startYourProject': 'Inicia Tu Proyecto',
      'home.viewOurWork': 'Ver Nuestro Trabajo',
      'home.trustedByLeaders': 'Confianza de Líderes de la Industria',
      'home.ourExpertise': 'Nuestra Experiencia',
      'home.automotiveLuxury': 'Automotriz de Lujo',
      'home.financialServices': 'Servicios Financieros',
      'home.clientTracking': 'Seguimiento de Clientes',
      'home.digitalTransformation': 'Transformación Digital'
    };

    // Create translations for English
    Object.entries(enTranslations).forEach(([key, value]) => {
      this.translations.push(Translation.create('en', key, value));
    });

    // Create translations for Spanish
    Object.entries(esTranslations).forEach(([key, value]) => {
      this.translations.push(Translation.create('es', key, value));
    });
  }

  async getByLanguage(language: string): Promise<Translation[]> {
    const filtered = this.translations.filter(t => t.getLanguage() === language);
    return Promise.resolve(filtered);
  }

  async getByKey(key: string): Promise<Translation[]> {
    const filtered = this.translations.filter(t => t.getKey() === key);
    return Promise.resolve(filtered);
  }

  async getTranslation(language: string, key: string): Promise<Translation | null> {
    const translation = this.translations.find(
      t => t.getLanguage() === language && t.getKey() === key
    );
    return Promise.resolve(translation || null);
  }

  async save(translation: Translation): Promise<void> {
    const existingIndex = this.translations.findIndex(
      t => t.getLanguage() === translation.getLanguage() && 
          t.getKey() === translation.getKey()
    );
    
    if (existingIndex >= 0) {
      this.translations[existingIndex] = translation;
    } else {
      this.translations.push(translation);
    }
    return Promise.resolve();
  }

  async delete(language: string, key: string): Promise<void> {
    this.translations = this.translations.filter(
      t => !(t.getLanguage() === language && t.getKey() === key)
    );
    return Promise.resolve();
  }
}