import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';
export class BreakdownEndedEvent extends StorableEvent {
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
