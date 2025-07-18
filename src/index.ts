// Domain
export * from './domain/portfolio/entities/Client';
export * from './domain/portfolio/repositories/ClientRepository';
export * from './domain/portfolio/services/PortfolioService';

export * from './domain/service/entities/ServiceOffering';
export * from './domain/service/repositories/ServiceRepository';
export * from './domain/service/services/ServiceCatalogService';

export * from './domain/content/entities/Translation';
export * from './domain/content/repositories/TranslationRepository';
export * from './domain/content/services/TranslationService';

export * from './domain/animation/entities/AnimationConfig';
export * from './domain/animation/services/AnimationService';

// Application
export * from './application/dto/ClientDto';
export * from './application/dto/ServiceDto';
export * from './application/dto/TranslationDto';

export * from './application/use-cases/GetPortfolioClients';
export * from './application/use-cases/GetServices';
export * from './application/use-cases/GetTranslations';

export * from './application/ports/PortfolioPort';
export * from './application/ports/ServicePort';
export * from './application/ports/TranslationPort';

// Infrastructure
export * from './infrastructure/repositories/InMemoryClientRepository';
export * from './infrastructure/repositories/InMemoryServiceRepository';
export * from './infrastructure/repositories/StaticTranslationRepository';

export * from './infrastructure/adapters/PortfolioAdapter';
export * from './infrastructure/adapters/ServiceAdapter';
export * from './infrastructure/adapters/TranslationAdapter';

export * from './infrastructure/services/DIContainer';

// Presentation
export * from './presentation/hooks/usePortfolio';
export * from './presentation/hooks/useServices';
export * from './presentation/hooks/useTranslations';
export * from './presentation/hooks/useAnimations';

export * from './presentation/components/ClientCard';
export * from './presentation/components/ServiceCard';
export * from './presentation/components/ClientsSection';
export * from './presentation/components/ServicesSection';

export * from './presentation/pages/HomePage';

// Shared
export * from './shared/types';
export * from './shared/utils';
export * from './shared/constants';