export class Description {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    if (value.length > 500) {
      throw new Error('Description cannot exceed 500 characters');
    }
  }
}