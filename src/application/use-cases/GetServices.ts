import { ServiceCatalogService } from '../../domain/service/services/ServiceCatalogService';
import { ServiceDto } from '../dto/ServiceDto';

export class GetServices {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  async execute(): Promise<ServiceDto[]> {
    const services = await this.serviceCatalogService.getAllServices();
    
    return services.map(service => ({
      id: service.id,
      title: service.getTitle(),
      description: service.getDescription(),
      icon: service.getIcon()
    }));
  }
}

export class SearchServices {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  async execute(query: string): Promise<ServiceDto[]> {
    const services = await this.serviceCatalogService.searchServices(query);
    
    return services.map(service => ({
      id: service.id,
      title: service.getTitle(),
      description: service.getDescription(),
      icon: service.getIcon()
    }));
  }
}