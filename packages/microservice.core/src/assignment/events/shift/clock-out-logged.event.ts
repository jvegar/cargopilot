import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';

export class ClockOutLoggedEvent extends StorableEvent {
  readonly id: string;
  readonly assignmentId: string;
  readonly clockOut: CheckPoint;
  readonly updatedBy: string;
  readonly updatedAt: Date;
  readonly overrideId?: string;
  readonly odometerEnd?: number;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    assignmentId: string,
    clockOut: CheckPoint,
    updatedBy: string,
    updatedAt: Date,
    overrideId?: string,
    odometerEnd?: number,
  ) {
    super();
    this.id = id;
    this.assignmentId = assignmentId;
    this.clockOut = clockOut;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.overrideId = overrideId;
    this.odometerEnd = odometerEnd;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
