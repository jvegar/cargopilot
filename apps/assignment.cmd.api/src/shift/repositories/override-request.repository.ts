import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from '@cargopilot/event-sourcing';
import { WorkDayOverrideAggregate } from '../models';
import { EventAggregateEnum } from '@cargopilot/microservice.core';
import {
  AbstractAggregateRepository,
  domainsEnum,
} from '@cargopilot/common-types-and-helpers';

@Injectable()
export class OverrideRequestRepository extends AbstractAggregateRepository<WorkDayOverrideAggregate> {
  constructor(store: EventStore, publisher: StoreEventPublisher) {
    super(
      store,
      publisher,
      EventAggregateEnum.OVERRIDE_REQUEST,
      (id) => new WorkDayOverrideAggregate(id),
      domainsEnum.SHIFT,
    );
  }
}
