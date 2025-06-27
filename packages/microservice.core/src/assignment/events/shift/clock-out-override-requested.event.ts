import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';
export class ClockOutOverrideRequestedEvent extends StorableEvent {
    readonly id: string;
    readonly workDayId: string;
    readonly assignmentId: string;
    readonly checkPoint: CheckPoint;
    readonly createdBy: string;
    readonly createdAt: Date;
    readonly notes?: string;
    readonly odometerEnd?: number;
    eventAggregate: EventAggregateEnum;
    eventVersion: number;
    constructor(id: string, workDayId: string, assignmentId: string, checkPoint: CheckPoint, createdBy: string, createdAt: Date, notes?: string, odometerEnd?: number) {
      super();
      this.id = id;
      this.workDayId = workDayId;
      this.assignmentId = assignmentId;
      this.checkPoint = checkPoint;
      this.createdBy = createdBy;
      this.createdAt = createdAt;
      this.notes = notes;
      this.odometerEnd = odometerEnd;
    };
}

