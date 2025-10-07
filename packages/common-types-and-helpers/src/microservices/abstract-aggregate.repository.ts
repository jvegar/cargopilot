import {
  AggregateRepository,
  EventStore,
  StorableAggregateRoot,
  StoreEventPublisher,
} from "@cargopilot/event-sourcing";
import { domainsEnum, ErrorBuilder } from "../error-builder";
export abstract class AbstractAggregateRepository<
  AGGREGATE_ROOT extends StorableAggregateRoot,
> extends AggregateRepository {
  readonly store: EventStore;
  private readonly publisher;
  readonly target: string;
  readonly buildAggregateRoot: (id: string) => AGGREGATE_ROOT;
  readonly errorOnNotFound?: domainsEnum;
  private readonly exceptions;
  protected constructor(
    store: EventStore,
    publisher: StoreEventPublisher,
    target: string,
    buildAggregateRoot: (id: string) => AGGREGATE_ROOT,
    errorOnNotFound?: domainsEnum,
  ) {
    super(store);
    this.store = store;
    this.publisher = publisher;
    this.target = target;
    this.buildAggregateRoot = buildAggregateRoot;
    this.errorOnNotFound = errorOnNotFound;
    this.exceptions = new ErrorBuilder(errorOnNotFound);
  }

  async rehydrate(
    id: string,
    createIfNotExist = false,
  ): Promise<AGGREGATE_ROOT | null> {
    const aggregate = await this.findOneById(id, createIfNotExist);
    if (!aggregate) {
      return null;
    }
    return new Promise((res, rej) =>
      this.publisher.mergeObjectContext(aggregate),
    );
  }

  async storeSnapshot(id: string): Promise<void> {
    const { events } = await this.store.getEventsAndSnapshot(this.target, id);
    if (events.length >= this.store.snapshotLimit) {
      const aggregate = await this.rehydrate(id, true);
      await this.store.storeSnapshotingPoint(this.target, id, aggregate);
    }
  }

  async findOneById(
    id: string,
    createIfNotExist = false,
  ): Promise<AGGREGATE_ROOT | null> {
    let _a;
    const aggregateRoot = this.buildAggregateRoot(id);
    const { events, snapshot } = await this.store.getEventsAndSnapshot(
      this.target,
      id,
    );
    return new Promise((res, rej) => {
      if (!createIfNotExist && !events.length && !snapshot) {
        if (this.errorOnNotFound) {
          throw (_a = this.exceptions) === null || _a === void 0
            ? void 0
            : _a.NotFoundException;
        }
        return null;
      }
      if (snapshot) {
        aggregateRoot.applySnapshot(snapshot);
      }
      aggregateRoot.loadFromHistory(events);
      return aggregateRoot;
    });
  }
}
