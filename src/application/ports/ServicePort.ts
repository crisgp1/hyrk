import { ServiceDto } from '../dto/ServiceDto';

export interface ServicePort {
  getAllServices(): Promise<ServiceDto[]>;
  getServiceById(id: string): Promise<ServiceDto | null>;
  searchServices(query: string): Promise<ServiceDto[]>;
}