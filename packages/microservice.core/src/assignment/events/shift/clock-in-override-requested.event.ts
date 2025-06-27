import { StorableEvent } from '@cargopilot/event-sourcing';
import { EventAggregateEnum } from '../../enums';
import { CheckPoint } from '../../interfaces';
export class ClockInOverrideRequestedEvent extends StorableEvent {
    readonly id: string;
    readonly assignmentId: string;
    readonly checkPoint: CheckPoint;
    readonly createdBy: string;
    readonly createdAt: Date;
    readonly notes?: string;
    readonly odometerStart?: number;
    eventAggregate: EventAggregateEnum;
    eventVersion: number;
    constructor(id: string, assignmentId: string, checkPoint: CheckPoint, createdBy: string, createdAt: Date, notes?: string, odometerStart?: number) {
      super();
      this.id = id;
      this.assignmentId = assignmentId;
      this.checkPoint = checkPoint;
      this.createdBy = createdBy;
      this.createdAt = createdAt;
      this.notes = notes;
      this.odometerStart = odometerStart;
      this.eventVersion = 1;
    };
}

