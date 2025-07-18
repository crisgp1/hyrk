import { Client } from '../entities/Client';
import { ClientRepository } from '../repositories/ClientRepository';

export class PortfolioService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.getAll();
  }

  async getFeaturedClients(limit: number = 4): Promise<Client[]> {
    const allClients = await this.clientRepository.getAll();
    return allClients.slice(0, limit);
  }

  async getClientsByDomain(domain: string): Promise<Client[]> {
    const allClients = await this.clientRepository.getAll();
    return allClients.filter(client => 
      client.getDomain().toLowerCase().includes(domain.toLowerCase())
    );
  }

  async validateClientData(clientData: {
    name: string;
    domain: string;
    description: string;
  }): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      Client.create('temp', clientData.name, clientData.domain, clientData.description);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown validation error');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}