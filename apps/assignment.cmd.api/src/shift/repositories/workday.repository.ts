import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from '@cargopilot/event-sourcing';
import { WorkDayAggregate } from '../models';
import { EventAggregateEnum } from '@cargopilot/microservice.core/dist/assignment';
import {
  AbstractAggregateRepository,
  domainsEnum,
} from '@cargopilot/common-types-and-helpers';

@Injectable()
export class WorkdayRepository extends AbstractAggregateRepository<WorkDayAggregate> {
  constructor(store: EventStore, publisher: StoreEventPublisher) {
    super(
      store,
      publisher,
      EventAggregateEnum.WORK_DAY,
      (id) => new WorkDayAggregate(id),
      domainsEnum.SHIFT,
    );
  }
}
