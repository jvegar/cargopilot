import { AggregateRepository, EventStore, StorableAggregateRoot, StoreEventPublisher } from '@haulapp/event-sourcing';
import { domainsEnum } from "../error-builder";
export abstract class AbstractAggregateRepository<AGGREGATE_ROOT extends StorableAggregateRoot> extends AggregateRepository {
  readonly store: EventStore;
  private readonly publisher;
  readonly target: string;
  readonly buildAggregateRoot: (id: string) => AGGREGATE_ROOT;
  readonly errorOnNotFound?: domainsEnum;
  private readonly exceptions;
  protected constructor(store: EventStore, publisher: StoreEventPublisher, target: string, buildAggregateRoot: (id: string) => AGGREGATE_ROOT, errorOnNotFound?: domainsEnum) {
    super(store);
    this.store = store;
    this.publisher = publisher;


  };
  rehydrate(id: string, createIfNotExist?: boolean): Promise<AGGREGATE_ROOT>;
  storeSnapshot(id: string): Promise<void>;
  findOneById(id: string, createIfNotExist?: boolean): Promise<AGGREGATE_ROOT | null>;
}

