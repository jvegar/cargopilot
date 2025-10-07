import { StorableAggregateRoot } from '@cargopilot/event-sourcing';
import { v4 as uuidv4 } from 'uuid';
import {
  Break,
  Breakdown,
  CheckPoint,
  Stop,
  Workday,
  ClockInCommand,
  AddStopCommand,
  ClockOutCommand,
  CreateWorkdayCommand,
  DeleteWorkdayCommand,
  EndBreakCommand,
  EndBreakdownCommand,
  StartBreakCommand,
  StartBreakdownCommand,
  UpdateWorkdayCommand,
  BreakdownStartedEvent,
  ClockInLoggedEvent,
  ClockOutLoggedEvent,
  StopAddedEvent,
  WorkDayCreatedEvent,
  WorkDayDeletedEvent,
  WorkDayStatusEnum,
  WorkDayUpdatedEvent,
  BreakStartedEvent,
  BreakEndedEvent,
  BreakdownEndedEvent,
} from '@cargopilot/microservice.core';

const mapBreakdowns = (breakdowns: Breakdown[] | null = null) => {
  return (
    breakdowns?.map((breakdown) => ({
      ...breakdown,
      id: uuidv4(),
    })) ?? []
  );
};

export class WorkDayAggregate extends StorableAggregateRoot implements Workday {
  public readonly id: string;
  assignmentId: string;
  status: WorkDayStatusEnum = WorkDayStatusEnum.INITIAL;
  breaks: Break[] = [];
  breakdowns: Breakdown[] = [];
  overrides: string[] = [];
  clockIn: CheckPoint | null = null;
  clockOut: CheckPoint | null = null;
  activeBreak: Break | null = null;
  activeBreakdown: Breakdown | null = null;
  stops: Stop[] = [];
  createdAt: Date;
  createdBy: string;
  odometerStart?: number;
  odometerEnd?: number;
  updatedAt?: Date;
  updatedBy?: string;
  timezone?: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  applySnapshot(snapshot: Workday): WorkDayAggregate {
    this.assignmentId = snapshot.assignmentId;
    this.status = snapshot.status;
    this.breaks = snapshot.breaks;
    this.breakdowns = snapshot.breakdowns;
    this.overrides = snapshot.overrides;
    this.clockIn = snapshot.clockIn;
    this.clockOut = snapshot.clockOut;
    this.activeBreak = snapshot.activeBreak;
    this.activeBreakdown = snapshot.activeBreakdown;
    this.stops = snapshot.stops;
    this.createdAt = snapshot.createdAt;
    this.createdBy = snapshot.createdBy;
    this.odometerStart = snapshot.odometerStart;
    this.odometerEnd = snapshot.odometerEnd;
    this.updatedAt = snapshot.updatedAt;
    this.updatedBy = snapshot.updatedBy;
    this.timezone = snapshot.timezone;
    return this;
  }

  logClockIn({
    assignmentId,
    checkPoint,
    createdAt,
    createdBy,
    overrideId,
    odometerStart,
  }: ClockInCommand): WorkDayAggregate {
    this.apply(
      new ClockInLoggedEvent(
        this.id,
        assignmentId,
        checkPoint,
        createdBy,
        createdAt,
        overrideId,
        odometerStart,
      ),
    );
    return this;
  }

  startBreak({
    checkPoint,
    updatedBy,
    updatedAt,
  }: StartBreakCommand): WorkDayAggregate {
    this.apply(
      new BreakStartedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        updatedBy,
        updatedAt,
      ),
    );
    return this;
  }

  endBreak({
    checkPoint,
    updatedBy,
    updatedAt,
  }: EndBreakCommand): WorkDayAggregate {
    this.apply(
      new BreakEndedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        updatedBy,
        updatedAt,
      ),
    );
    return this;
  }

  startBreakdown({
    checkPoint,
    updatedBy,
    updatedAt,
    documents,
    description,
  }: StartBreakdownCommand): WorkDayAggregate {
    const breakdownId = uuidv4();
    this.apply(
      new BreakdownStartedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        breakdownId,
        description,
        updatedBy,
        updatedAt,
        documents,
      ),
    );
    return this;
  }

  endBreakdown({
    checkPoint,
    updatedBy,
    updatedAt,
  }: EndBreakdownCommand): WorkDayAggregate {
    this.apply(
      new BreakdownEndedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        updatedBy,
        updatedAt,
      ),
    );
    return this;
  }

  logClockOut({
    checkPoint,
    overrideId,
    odometerEnd,
    updatedBy,
    updatedAt,
  }: ClockOutCommand): WorkDayAggregate {
    this.apply(
      new ClockOutLoggedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        updatedBy,
        updatedAt,
        overrideId,
        odometerEnd,
      ),
    );
    return this;
  }

  addStop({
    checkPoint,
    updatedBy,
    updatedAt,
    notes,
  }: AddStopCommand): WorkDayAggregate {
    this.apply(
      new StopAddedEvent(
        this.id,
        this.assignmentId,
        checkPoint,
        updatedBy,
        updatedAt,
        notes,
      ),
    );
    return this;
  }

  markAsDeleted({
    updatedAt,
    updatedBy,
  }: DeleteWorkdayCommand): WorkDayAggregate {
    this.apply(new WorkDayDeletedEvent(this.id, updatedBy, updatedAt));
    return this;
  }

  updateWorkDay({
    data,
    updatedAt,
    updatedBy,
  }: UpdateWorkdayCommand): WorkDayAggregate {
    const breakdowns = mapBreakdowns(data.breakdowns);
    this.apply(
      new WorkDayUpdatedEvent(
        this.id,
        { breaks: [], stops: [], ...data, breakdowns },
        updatedBy,
        updatedAt,
      ),
    );
    return this;
  }

  createWorkDay({
    data,
    createdAt,
    createdBy,
  }: CreateWorkdayCommand): WorkDayAggregate {
    const breakdowns = mapBreakdowns(data.breakdowns);
    this.apply(
      new WorkDayCreatedEvent(
        this.id,
        { breaks: [], stops: [], ...data, breakdowns },
        createdBy,
        createdAt,
      ),
    );
    return this;
  }

  onClockInLoggedEvent(event: ClockInLoggedEvent): void {
    this.assignmentId = event.assignmentId;
    this.clockIn = event.clockIn;
    this.createdBy = event.createdBy;
    this.createdAt = event.createdAt;

    if (event.odometerStart) {
      this.odometerStart = event.odometerStart;
    }

    if (event.overrideId) {
      this.overrides.push(event.overrideId);
    }
  }

  onBreakStartedEvent(event: BreakStartedEvent): void {
    this.activeBreak = { start: event.start, end: null };
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onBreakEndedEvent(event: BreakEndedEvent): void {
    const currentBreak = this.activeBreak!;
    currentBreak.end = event.end;
    this.breaks.push(currentBreak);
    this.activeBreak = null;
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onBreakdownStartedEvent(event: BreakdownStartedEvent): void {
    this.activeBreakdown = {
      start: event.start,
      end: null,
      id: event.breakdownId,
      description: event.description,
      attachments: event.documents,
    };
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onBreakdownEndedEvent(event: BreakdownEndedEvent): void {
    const currentBreakdown = this.activeBreakdown!;

    currentBreakdown.end = event.end;
    this.breakdowns.push(currentBreakdown);
    this.activeBreakdown = null;
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onClockOutLoggedEvent(event: ClockOutLoggedEvent): void {
    this.clockOut = event.clockOut;
    this.status = WorkDayStatusEnum.COMPLETED;

    if (event.odometerEnd) {
      this.odometerEnd = event.odometerEnd;
    }

    if (event.overrideId) {
      this.overrides.push(event.overrideId);
    }
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onWorkDayUpdatedEvent(event: WorkDayUpdatedEvent) {
    const { editedWorkday } = event;

    if (!editedWorkday) {
      return;
    }

    this.clockIn = editedWorkday.clockIn;
    this.clockOut = editedWorkday.clockOut;
    this.breaks = editedWorkday.breaks;
    this.breakdowns = editedWorkday.breakdowns;
    this.stops = editedWorkday.stops;
    this.odometerStart = editedWorkday.odometerStart;
    this.odometerEnd = editedWorkday.odometerEnd;
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onWorkDayCreatedEvent(event: WorkDayCreatedEvent) {
    const { payload } = event;

    this.clockIn = payload.clockIn;
    this.clockOut = payload.clockOut;
    this.assignmentId = payload.assignmentId;
    this.status = WorkDayStatusEnum.COMPLETED;
    this.breaks = payload.breaks;
    this.breakdowns = payload.breakdowns;
    this.stops = payload.stops;
    this.odometerStart = payload.odometerStart;
    this.odometerEnd = payload.odometerEnd;

    this.createdBy = event.createdBy;
    this.createdAt = event.createdAt;
  }

  onWorkDayDeletedEvent(event: WorkDayDeletedEvent) {
    this.status = WorkDayStatusEnum.DELETED;
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }

  onStopAddedEvent(event: StopAddedEvent): void {
    this.stops.push({
      checkpoint: event.checkpoint,
      notes: event.notes ?? '',
    });
    this.updatedBy = event.updatedBy;
    this.updatedAt = event.updatedAt;
  }
}
