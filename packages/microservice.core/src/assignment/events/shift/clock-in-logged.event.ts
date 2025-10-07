import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';

export class ClockInLoggedEvent extends StorableEvent {
  readonly id: string;
  readonly assignmentId: string;
  readonly clockIn: CheckPoint;
  readonly createdBy: string;
  readonly createdAt: Date;
  readonly overrideId?: string;
  readonly odometerStart?: number;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    assignmentId: string,
    clockIn: CheckPoint,
    createdBy: string,
    createdAt: Date,
    overrideId?: string,
    odometerStart?: number,
  ) {
    super();
    this.id = id;
    this.assignmentId = assignmentId;
    this.clockIn = clockIn;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.overrideId = overrideId;
    this.odometerStart = odometerStart;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
