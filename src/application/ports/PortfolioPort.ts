import { ClientDto } from '../dto/ClientDto';

export interface PortfolioPort {
  getAllClients(): Promise<ClientDto[]>;
  getFeaturedClients(limit?: number): Promise<ClientDto[]>;
  getClientById(id: string): Promise<ClientDto | null>;
}