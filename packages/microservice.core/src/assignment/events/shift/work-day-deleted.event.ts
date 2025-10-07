import { StorableEvent } from '@cargopilot/event-sourcing';
import { EventAggregateEnum } from '../../enums';

export class WorkDayDeletedEvent extends StorableEvent {
  readonly id: string;
  readonly updatedBy: any;
  readonly updatedAt: Date;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(id: string, updatedBy: any, updatedAt: Date) {
    super();
    this.id = id;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
