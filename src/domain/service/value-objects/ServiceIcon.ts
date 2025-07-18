export class ServiceIcon {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Service icon cannot be empty');
    }
    if (value.length > 10) {
      throw new Error('Service icon should be a simple emoji or short string');
    }
  }
}