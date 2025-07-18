export interface BaseEntity {
  id: string;
}

export interface ValueObject<T> {
  value: T;
}

export interface Repository<T extends BaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}

export interface DomainEvent {
  eventId: string;
  eventType: string;
  occurredOn: Date;
  aggregateId: string;
}

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}