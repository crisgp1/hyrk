import { PortfolioPort } from '../../application/ports/PortfolioPort';
import { ClientDto } from '../../application/dto/ClientDto';
import { GetPortfolioClients, GetFeaturedClients } from '../../application/use-cases/GetPortfolioClients';

export class PortfolioAdapter implements PortfolioPort {
  constructor(
    private readonly getPortfolioClients: GetPortfolioClients,
    private readonly getFeaturedClientsUseCase: GetFeaturedClients
  ) {}

  async getAllClients(): Promise<ClientDto[]> {
    return await this.getPortfolioClients.execute();
  }

  async getFeaturedClients(limit?: number): Promise<ClientDto[]> {
    return await this.getFeaturedClientsUseCase.execute(limit);
  }

  async getClientById(id: string): Promise<ClientDto | null> {
    const clients = await this.getAllClients();
    const client = clients.find(c => c.id === id);
    return client || null;
  }
}