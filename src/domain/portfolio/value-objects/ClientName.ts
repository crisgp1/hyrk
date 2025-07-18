export class ClientName {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Client name cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('Client name cannot exceed 100 characters');
    }
  }
}