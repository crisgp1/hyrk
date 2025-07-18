export class Domain {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Domain cannot be empty');
    }
    if (!this.isValidDomain(value)) {
      throw new Error('Invalid domain format');
    }
  }

  private isValidDomain(domain: string): boolean {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.([a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)$/;
    return domainRegex.test(domain);
  }
}