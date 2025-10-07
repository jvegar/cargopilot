import { StorableEvent } from '@cargopilot/event-sourcing';
import { CreateWorkDayPayload } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';

export class WorkDayCreatedEvent extends StorableEvent {
  readonly id: string;
  readonly payload: CreateWorkDayPayload;
  readonly createdBy: string;
  readonly createdAt: Date;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    payload: CreateWorkDayPayload,
    createdBy: string,
    createdAt: Date,
  ) {
    super();
    this.id = id;
    this.payload = payload;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
