"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractAggregateRepository = void 0;
const event_sourcing_1 = require("@cargopilot/event-sourcing");
const error_builder_1 = require("../error-builder");
class AbstractAggregateRepository extends event_sourcing_1.AggregateRepository {
    constructor(store, publisher, target, buildAggregateRoot, errorOnNotFound) {
        super(store);
        this.store = store;
        this.publisher = publisher;
        this.target = target;
        this.buildAggregateRoot = buildAggregateRoot;
        this.errorOnNotFound = errorOnNotFound;
        this.exceptions = new error_builder_1.ErrorBuilder(errorOnNotFound);
    }
    async rehydrate(id, createIfNotExist = false) {
        const aggregate = await this.findOneById(id, createIfNotExist);
        if (!aggregate) {
            return null;
        }
        return new Promise((res, rej) => this.publisher.mergeObjectContext(aggregate));
    }
    async storeSnapshot(id) {
        const { events } = await this.store.getEventsAndSnapshot(this.target, id);
        if (events.length >= this.store.snapshotLimit) {
            const aggregate = await this.rehydrate(id, true);
            await this.store.storeSnapshotingPoint(this.target, id, aggregate);
        }
    }
    async findOneById(id, createIfNotExist = false) {
        let _a;
        const aggregateRoot = this.buildAggregateRoot(id);
        const { events, snapshot } = await this.store.getEventsAndSnapshot(this.target, id);
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
exports.AbstractAggregateRepository = AbstractAggregateRepository;
