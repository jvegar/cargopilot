import { StorableEvent } from '@cargopilot/event-sourcing';
import { EventAggregateEnum } from '../../enums';
import { CheckPoint } from '../../interfaces';

export class BreakEndedEvent extends StorableEvent {
  readonly id: string;
  readonly assignmentId: string;
  readonly end: CheckPoint;
  readonly updatedBy: string;
  readonly updatedAt: Date;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    assignmentId: string,
    end: CheckPoint,
    updatedBy: string,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.assignmentId = assignmentId;
    this.end = end;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
