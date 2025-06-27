import { AggregateRoot } from "@nestjs/cqrs";
export abstract class StorableAggregateRoot extends AggregateRoot {
    abstract applySnapshot(snapshot: any): StorableAggregateRoot;
}

