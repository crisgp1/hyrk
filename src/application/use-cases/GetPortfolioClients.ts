import { PortfolioService } from '../../domain/portfolio/services/PortfolioService';
import { ClientDto } from '../dto/ClientDto';

export class GetPortfolioClients {
  constructor(private readonly portfolioService: PortfolioService) {}

  async execute(): Promise<ClientDto[]> {
    const clients = await this.portfolioService.getAllClients();
    
    return clients.map(client => ({
      id: client.id,
      name: client.getName(),
      domain: client.getDomain(),
      description: client.getDescription(),
      initial: client.getInitial()
    }));
  }
}

export class GetFeaturedClients {
  constructor(private readonly portfolioService: PortfolioService) {}

  async execute(limit: number = 4): Promise<ClientDto[]> {
    const clients = await this.portfolioService.getFeaturedClients(limit);
    
    return clients.map(client => ({
      id: client.id,
      name: client.getName(),
      domain: client.getDomain(),
      description: client.getDescription(),
      initial: client.getInitial()
    }));
  }
}