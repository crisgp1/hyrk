# Domain-Driven Design Architecture

This directory contains the DDD (Domain-Driven Design) implementation of the hyrk.io application.

## Architecture Overview

```
src/
├── domain/           # Business logic and domain models
├── application/      # Use cases and application services
├── infrastructure/   # External dependencies and implementations
├── presentation/     # UI components and React hooks
└── shared/          # Common utilities and types
```

## Domain Layer

Contains the core business logic and domain models:

### Portfolio Domain
- **Entities**: Client
- **Value Objects**: ClientName, Domain, Description
- **Services**: PortfolioService
- **Repository Interface**: ClientRepository

### Service Domain
- **Entities**: ServiceOffering
- **Value Objects**: ServiceTitle, ServiceIcon
- **Services**: ServiceCatalogService
- **Repository Interface**: ServiceRepository

### Content Domain
- **Entities**: Translation
- **Value Objects**: Language, TranslationKey, TranslationValue
- **Services**: TranslationService
- **Repository Interface**: TranslationRepository

### Animation Domain
- **Entities**: AnimationConfig
- **Value Objects**: AnimationType, Duration, Ease
- **Services**: AnimationService

## Application Layer

Orchestrates domain objects to fulfill use cases:

### Use Cases
- `GetPortfolioClients` - Retrieve all portfolio clients
- `GetFeaturedClients` - Get featured clients for homepage
- `GetServices` - Retrieve all services
- `SearchServices` - Search services by query
- `GetTranslations` - Get translations for a language
- `GetTranslation` - Get single translation with fallback

### DTOs (Data Transfer Objects)
- `ClientDto` - Client representation for UI
- `ServiceDto` - Service representation for UI  
- `TranslationDto` - Translation data for UI

### Ports (Interfaces)
- `PortfolioPort` - Portfolio operations interface
- `ServicePort` - Service operations interface
- `TranslationPort` - Translation operations interface

## Infrastructure Layer

Implements external dependencies and adapters:

### Repositories (Concrete Implementations)
- `InMemoryClientRepository` - In-memory client storage
- `InMemoryServiceRepository` - In-memory service storage
- `StaticTranslationRepository` - Static translation data

### Adapters
- `PortfolioAdapter` - Adapts portfolio use cases to ports
- `ServiceAdapter` - Adapts service use cases to ports
- `TranslationAdapter` - Adapts translation use cases to ports

### Services
- `DIContainer` - Dependency injection container

## Presentation Layer

React components and hooks that use the clean architecture:

### Hooks
- `usePortfolio` - Portfolio data and operations
- `useServices` - Service data and operations
- `useTranslations` - Translation data and utilities
- `useAnimations` - Animation helpers and GSAP integration

### Components
- `ClientCard` - Individual client display
- `ServiceCard` - Individual service display
- `ClientsSection` - Complete clients section
- `ServicesSection` - Complete services section
- `HomePage` - Main page component

## Shared Layer

Common utilities, types, and constants:

### Types
- Base interfaces for entities, repositories, use cases
- Domain event interfaces
- Common type definitions

### Utils
- ID generation
- Validation utilities
- Debounce and throttle functions

### Constants
- Supported languages
- Animation presets
- Breakpoints
- Error codes

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Testability**: Business logic is isolated and easily testable
3. **Maintainability**: Clean boundaries between layers
4. **Scalability**: Easy to add new features and domains
5. **Flexibility**: Easy to swap out implementations
6. **Domain Focus**: Business rules are clearly expressed in the domain layer

## Usage

Import from the main index file:

```typescript
import { 
  DIContainer, 
  usePortfolio, 
  ClientsSection 
} from '../src';

// Use the DI container to get services
const container = DIContainer.getInstance();
const portfolioAdapter = container.getPortfolioAdapter();

// Use hooks in React components
const { clients, loading } = usePortfolio();

// Use pre-built components
<ClientsSection language="en" />
```

## Adding New Features

1. **Add Domain Models**: Create entities and value objects in the domain layer
2. **Add Use Cases**: Create application services in the application layer
3. **Add Infrastructure**: Implement repositories and adapters
4. **Add Presentation**: Create React components and hooks
5. **Update DI Container**: Wire up new dependencies

This architecture ensures that business logic remains pure and infrastructure concerns are properly separated.