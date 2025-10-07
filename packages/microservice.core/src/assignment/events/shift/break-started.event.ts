import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';

export class BreakStartedEvent extends StorableEvent {
  readonly id: string;
  readonly assignmentId: string;
  readonly start: CheckPoint;
  readonly updatedBy: string;
  readonly updatedAt: Date;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    assignmentId: string,
    start: CheckPoint,
    updatedBy: string,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.assignmentId = assignmentId;
    this.start = start;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
