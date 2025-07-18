import { ServiceTitle } from '../value-objects/ServiceTitle';
import { Description } from '../../portfolio/value-objects/Description';
import { ServiceIcon } from '../value-objects/ServiceIcon';

export class ServiceOffering {
  constructor(
    public readonly id: string,
    public readonly title: ServiceTitle,
    public readonly description: Description,
    public readonly icon: ServiceIcon
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    icon: string
  ): ServiceOffering {
    return new ServiceOffering(
      id,
      new ServiceTitle(title),
      new Description(description),
      new ServiceIcon(icon)
    );
  }

  public getTitle(): string {
    return this.title.value;
  }

  public getDescription(): string {
    return this.description.value;
  }

  public getIcon(): string {
    return this.icon.value;
  }
}