export class ServiceTitle {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Service title cannot be empty');
    }
    if (value.length > 200) {
      throw new Error('Service title cannot exceed 200 characters');
    }
  }
}