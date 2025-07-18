import { ServiceOffering } from '../../domain/service/entities/ServiceOffering';
import { ServiceRepository } from '../../domain/service/repositories/ServiceRepository';

export class InMemoryServiceRepository implements ServiceRepository {
  private services: ServiceOffering[] = [];

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    this.services = [
      ServiceOffering.create(
        '1',
        'Automotive Luxury',
        'Premium automotive solutions with cutting-edge technology for luxury brands and high-end dealerships',
        '🚗'
      ),
      ServiceOffering.create(
        '2',
        'Financial Services',
        'Secure, scalable financial platforms with compliance-first architecture and real-time processing',
        '💰'
      ),
      ServiceOffering.create(
        '3',
        'Client Tracking',
        'Advanced CRM and customer journey analytics with AI-powered insights and automation',
        '📊'
      ),
      ServiceOffering.create(
        '4',
        'Digital Transformation',
        'End-to-end modernization of legacy systems with cloud-native, scalable architectures',
        '⚡'
      )
    ];
  }

  async getAll(): Promise<ServiceOffering[]> {
    return Promise.resolve([...this.services]);
  }

  async getById(id: string): Promise<ServiceOffering | null> {
    const service = this.services.find(s => s.id === id);
    return Promise.resolve(service || null);
  }

  async getByCategory(category: string): Promise<ServiceOffering[]> {
    const filtered = this.services.filter(service =>
      service.getTitle().toLowerCase().includes(category.toLowerCase())
    );
    return Promise.resolve(filtered);
  }

  async save(service: ServiceOffering): Promise<void> {
    const existingIndex = this.services.findIndex(s => s.id === service.id);
    if (existingIndex >= 0) {
      this.services[existingIndex] = service;
    } else {
      this.services.push(service);
    }
    return Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    this.services = this.services.filter(s => s.id !== id);
    return Promise.resolve();
  }
}