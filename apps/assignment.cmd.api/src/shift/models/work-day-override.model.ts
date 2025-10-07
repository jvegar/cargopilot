import { StorableAggregateRoot } from '@cargopilot/event-sourcing';
import {
  CheckPoint,
  ClockInOverrideRequestedEvent,
  ClockOutOverrideRequestedEvent,
  OverrideRequest,
  OverrideStatusEnum,
  OverrideTypeEnum,
  RequestClockInOverrideCommand,
  RequestClockOutOverrideCommand,
} from '@cargopilot/microservice.core';

export class WorkDayOverrideAggregate
  extends StorableAggregateRoot
  implements OverrideRequest
{
  readonly id: string;
  workDayId: string;
  status: OverrideStatusEnum = OverrideStatusEnum.REQUESTED;
  type: OverrideTypeEnum;
  checkPoint: CheckPoint;
  notes?: string;
  odometerStart?: number;
  odometerEnd?: number;
  assignmentId: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  applySnapshot(snapshot: OverrideRequest): WorkDayOverrideAggregate {
    this.workDayId = snapshot.workDayId;
    this.status = snapshot.status;
    this.type = snapshot.type;
    this.checkPoint = snapshot.checkPoint;
    this.notes = snapshot.notes;
    this.odometerStart = snapshot.odometerStart;
    this.odometerEnd = snapshot.odometerEnd;
    this.assignmentId = snapshot.assignmentId;
    this.createdAt = snapshot.createdAt;
    this.createdBy = snapshot.createdBy;
    this.updatedAt = snapshot.updatedAt;
    this.updatedBy = snapshot.updatedBy;

    return this;
  }

  requestClockInOverride({
    assignmentId,
    checkPoint,
    createdAt,
    createdBy,
    notes,
    odometerStart,
  }: RequestClockInOverrideCommand): WorkDayOverrideAggregate {
    this.apply(
      new ClockInOverrideRequestedEvent(
        this.id,
        assignmentId,
        checkPoint,
        createdBy,
        createdAt,
        notes,
        odometerStart,
      ),
    );

    return this;
  }

  requestClockOutOverride({
    assignmentId,
    checkPoint,
    createdBy,
    createdAt,
    workDayId,
    notes,
    odometerEnd,
  }: RequestClockOutOverrideCommand): WorkDayOverrideAggregate {
    this.apply(
      new ClockOutOverrideRequestedEvent(
        this.id,
        workDayId,
        assignmentId,
        checkPoint,
        createdBy,
        createdAt,
        notes,
        odometerEnd,
      ),
    );
    return this;
  }

  onClockInOverrideRequestedEvent(event: ClockInOverrideRequestedEvent): void {
    this.assignmentId = event.assignmentId;
    this.checkPoint = event.checkPoint;
    this.type = OverrideTypeEnum.CLOCK_IN;
    this.notes = event.notes;
    this.odometerStart = event.odometerStart;
    this.createdAt = event.createdAt;
    this.createdBy = event.createdBy;
  }

  onClockOutOverrideRequestedEvent(
    event: ClockOutOverrideRequestedEvent,
  ): void {
    this.assignmentId = event.assignmentId;
    this.workDayId = event.workDayId;
    this.checkPoint = event.checkPoint;
    this.type = OverrideTypeEnum.CLOCK_OUT;
    this.notes = event.notes;
    this.odometerEnd = event.odometerEnd;
    this.createdAt = event.createdAt;
    this.createdBy = event.createdBy;
  }
}
