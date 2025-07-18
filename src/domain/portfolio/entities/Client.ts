import { ClientName } from '../value-objects/ClientName';
import { Domain } from '../value-objects/Domain';
import { Description } from '../value-objects/Description';

export class Client {
  constructor(
    public readonly id: string,
    public readonly name: ClientName,
    public readonly domain: Domain,
    public readonly description: Description
  ) {}

  static create(
    id: string,
    name: string,
    domain: string,
    description: string
  ): Client {
    return new Client(
      id,
      new ClientName(name),
      new Domain(domain),
      new Description(description)
    );
  }

  public getName(): string {
    return this.name.value;
  }

  public getDomain(): string {
    return this.domain.value;
  }

  public getDescription(): string {
    return this.description.value;
  }

  public getInitial(): string {
    return this.name.value.charAt(0).toUpperCase();
  }
}