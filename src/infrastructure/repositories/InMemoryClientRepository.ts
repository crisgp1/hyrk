import { Client } from '../../domain/portfolio/entities/Client';
import { ClientRepository } from '../../domain/portfolio/repositories/ClientRepository';

export class InMemoryClientRepository implements ClientRepository {
  private clients: Client[] = [];

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    this.clients = [
      Client.create(
        '1',
        'Cliquealo',
        'cliquealo.mx',
        'E-commerce platform revolutionizing online shopping in Mexico'
      ),
      Client.create(
        '2',
        'Tramboory',
        'tramboory.com',
        'Digital transformation solutions for modern businesses'
      ),
      Client.create(
        '3',
        'Livinning',
        'livinning.com',
        'Luxury lifestyle and premium service management platform'
      ),
      Client.create(
        '4',
        'Trigger',
        'trigger.mx',
        'Automated marketing and customer engagement platform'
      )
    ];
  }

  async getAll(): Promise<Client[]> {
    return Promise.resolve([...this.clients]);
  }

  async getById(id: string): Promise<Client | null> {
    const client = this.clients.find(c => c.id === id);
    return Promise.resolve(client || null);
  }

  async save(client: Client): Promise<void> {
    const existingIndex = this.clients.findIndex(c => c.id === client.id);
    if (existingIndex >= 0) {
      this.clients[existingIndex] = client;
    } else {
      this.clients.push(client);
    }
    return Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    this.clients = this.clients.filter(c => c.id !== id);
    return Promise.resolve();
  }
}