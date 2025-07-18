import { ServiceOffering } from '../entities/ServiceOffering';

export interface ServiceRepository {
  getAll(): Promise<ServiceOffering[]>;
  getById(id: string): Promise<ServiceOffering | null>;
  getByCategory(category: string): Promise<ServiceOffering[]>;
  save(service: ServiceOffering): Promise<void>;
  delete(id: string): Promise<void>;
}