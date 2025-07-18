import { PortfolioService } from '../../domain/portfolio/services/PortfolioService';
import { ServiceCatalogService } from '../../domain/service/services/ServiceCatalogService';
import { TranslationService } from '../../domain/content/services/TranslationService';
import { AnimationService } from '../../domain/animation/services/AnimationService';

import { InMemoryClientRepository } from '../repositories/InMemoryClientRepository';
import { InMemoryServiceRepository } from '../repositories/InMemoryServiceRepository';
import { StaticTranslationRepository } from '../repositories/StaticTranslationRepository';

import { GetPortfolioClients, GetFeaturedClients } from '../../application/use-cases/GetPortfolioClients';
import { GetServices, SearchServices } from '../../application/use-cases/GetServices';
import { GetTranslations, GetTranslation, GetSupportedLanguages } from '../../application/use-cases/GetTranslations';

import { PortfolioAdapter } from '../adapters/PortfolioAdapter';
import { ServiceAdapter } from '../adapters/ServiceAdapter';
import { TranslationAdapter } from '../adapters/TranslationAdapter';

export class DIContainer {
  private static instance: DIContainer;
  
  // Repositories
  private readonly clientRepository = new InMemoryClientRepository();
  private readonly serviceRepository = new InMemoryServiceRepository();
  private readonly translationRepository = new StaticTranslationRepository();
  
  // Domain Services
  private readonly portfolioService = new PortfolioService(this.clientRepository);
  private readonly serviceCatalogService = new ServiceCatalogService(this.serviceRepository);
  private readonly translationService = new TranslationService(this.translationRepository);
  private readonly animationService = new AnimationService();
  
  // Use Cases
  private readonly getPortfolioClients = new GetPortfolioClients(this.portfolioService);
  private readonly getFeaturedClients = new GetFeaturedClients(this.portfolioService);
  private readonly getServices = new GetServices(this.serviceCatalogService);
  private readonly searchServices = new SearchServices(this.serviceCatalogService);
  private readonly getTranslations = new GetTranslations(this.translationService);
  private readonly getTranslation = new GetTranslation(this.translationService);
  private readonly getSupportedLanguages = new GetSupportedLanguages(this.translationService);
  
  // Adapters
  private readonly portfolioAdapter = new PortfolioAdapter(
    this.getPortfolioClients,
    this.getFeaturedClients
  );
  private readonly serviceAdapter = new ServiceAdapter(
    this.getServices,
    this.searchServices
  );
  private readonly translationAdapter = new TranslationAdapter(
    this.getTranslations,
    this.getTranslation,
    this.getSupportedLanguages
  );

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  public getPortfolioAdapter(): PortfolioAdapter {
    return this.portfolioAdapter;
  }

  public getServiceAdapter(): ServiceAdapter {
    return this.serviceAdapter;
  }

  public getTranslationAdapter(): TranslationAdapter {
    return this.translationAdapter;
  }

  public getAnimationService(): AnimationService {
    return this.animationService;
  }
}