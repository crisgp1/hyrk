import { Client } from '../entities/Client';

export interface ClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  save(client: Client): Promise<void>;
  delete(id: string): Promise<void>;
}