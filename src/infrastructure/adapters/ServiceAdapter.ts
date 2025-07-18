import { ServicePort } from '../../application/ports/ServicePort';
import { ServiceDto } from '../../application/dto/ServiceDto';
import { GetServices, SearchServices } from '../../application/use-cases/GetServices';

export class ServiceAdapter implements ServicePort {
  constructor(
    private readonly getServicesUseCase: GetServices,
    private readonly searchServicesUseCase: SearchServices
  ) {}

  async getAllServices(): Promise<ServiceDto[]> {
    return await this.getServicesUseCase.execute();
  }

  async getServiceById(id: string): Promise<ServiceDto | null> {
    const services = await this.getAllServices();
    const service = services.find(s => s.id === id);
    return service || null;
  }

  async searchServices(query: string): Promise<ServiceDto[]> {
    return await this.searchServicesUseCase.execute(query);
  }
}