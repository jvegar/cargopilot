import { AggregateRepository, EventStore, StorableAggregateRoot, StoreEventPublisher } from "@cargopilot/event-sourcing";
import { domainsEnum } from "../error-builder";
export declare abstract class AbstractAggregateRepository<AGGREGATE_ROOT extends StorableAggregateRoot> extends AggregateRepository {
    readonly store: EventStore;
    private readonly publisher;
    readonly target: string;
    readonly buildAggregateRoot: (id: string) => AGGREGATE_ROOT;
    readonly errorOnNotFound?: domainsEnum;
    private readonly exceptions;
    protected constructor(store: EventStore, publisher: StoreEventPublisher, target: string, buildAggregateRoot: (id: string) => AGGREGATE_ROOT, errorOnNotFound?: domainsEnum);
    rehydrate(id: string, createIfNotExist?: boolean): Promise<AGGREGATE_ROOT | null>;
    storeSnapshot(id: string): Promise<void>;
    findOneById(id: string, createIfNotExist?: boolean): Promise<AGGREGATE_ROOT | null>;
}
//# sourceMappingURL=abstract-aggregate.repository.d.ts.map