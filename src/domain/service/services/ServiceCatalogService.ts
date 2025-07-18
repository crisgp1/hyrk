import { ServiceOffering } from '../entities/ServiceOffering';
import { ServiceRepository } from '../repositories/ServiceRepository';

export class ServiceCatalogService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllServices(): Promise<ServiceOffering[]> {
    return await this.serviceRepository.getAll();
  }

  async getServicesByCategory(category: string): Promise<ServiceOffering[]> {
    return await this.serviceRepository.getByCategory(category);
  }

  async searchServices(query: string): Promise<ServiceOffering[]> {
    const allServices = await this.serviceRepository.getAll();
    const lowerQuery = query.toLowerCase();
    
    return allServices.filter(service => 
      service.getTitle().toLowerCase().includes(lowerQuery) ||
      service.getDescription().toLowerCase().includes(lowerQuery)
    );
  }

  async validateServiceData(serviceData: {
    title: string;
    description: string;
    icon: string;
  }): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      ServiceOffering.create('temp', serviceData.title, serviceData.description, serviceData.icon);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown validation error');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}