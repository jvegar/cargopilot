import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import {
  AddStopCommand,
  ClockInCommand,
  ClockOutCommand,
  CreateWorkdayCommand,
  DeleteWorkdayCommand,
  EndBreakCommand,
  EndBreakdownCommand,
  MigrateWorkDayCommand,
  OverrideTypeEnum,
  RequestClockInOverrideCommand,
  RequestClockOutOverrideCommand,
  StartBreakCommand,
  StartBreakdownCommand,
  UpdateWorkdayCommand,
} from '@cargopilot/microservice.core';

import { MicroservicesClient } from 'src/kafka-clients';
import { OverrideRequestRepository, WorkdayRepository } from './repositories';
import {
  domainsEnum,
  ErrorBuilder,
  IValidationErrorToUser,
} from '@cargopilot/common-types-and-helpers';
import { MigrateWorkDayOverrideCommand } from '@cargopilot/microservice.core/dist/assignment/commands/shift/migrate-work-day-override.command';

@Injectable()
export class ShiftService {
  private readonly exceptions: ErrorBuilder;

  constructor(
    private readonly microservicesClient: MicroservicesClient,
    private readonly workDayRepository: WorkdayRepository,
    private readonly overrideRequestRepository: OverrideRequestRepository,
  ) {
    this.exceptions = new ErrorBuilder(domainsEnum.SHIFT);
  }

  emitErrorToGateway(error: IValidationErrorToUser): void {
    this.emitToGateway('microservice.error.event', error);
  }
  private emitToGateway(pattern: string, data: any): void {
    this.microservicesClient.emit(pattern, data);
  }

  async handleClockInCommand(command: ClockInCommand) {
    const id = uuidv4();
    const workDay = await this.workDayRepository.rehydrate(id, true);
    workDay?.logClockIn(command).commit();
  }

  async handleMigrateWorkDayCommand(command: MigrateWorkDayCommand) {
    const workday = command.data;
    const aggregate = await this.workDayRepository.rehydrate(workday.id, true);
    aggregate
      ?.createWorkDay({
        data: workday,
        createdAt: new Date(workday.createdAt),
        createdBy: workday.createdBy,
      })
      .commit();
  }

  async handleMigrateWorkDayOverrideCommand(
    command: MigrateWorkDayOverrideCommand,
  ) {
    const override = await this.overrideRequestRepository.rehydrate(
      command.data.id,
      true,
    );
    if (override?.type === OverrideTypeEnum.CLOCK_IN) {
      override.requestClockInOverride(command.data).commit();
    } else {
      override?.requestClockOutOverride(command.data).commit();
    }
  }

  async handleClockOutCommand(command: ClockOutCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    if (!workDay?.clockIn) {
      throw this.exceptions.InvalidWorkDay;
    }
    if (workDay.activeBreak) {
      throw this.exceptions.ActiveBreak;
    }
    if (workDay.clockOut) {
      throw this.exceptions.ActiveClockOut;
    }
    workDay.logClockOut(command).commit();
  }

  async handleAddStopCommand(command: AddStopCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.addStop(command).commit();
  }

  async handleCreateWorkDayCommand(command: CreateWorkdayCommand) {
    const id = uuidv4();
    const workDay = await this.workDayRepository.rehydrate(id);
    workDay?.createWorkDay(command).commit();
  }

  async handleDeleteWorkdayCommand(command: DeleteWorkdayCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.markAsDeleted(command).commit();
  }

  async handleEndBreakCommand(command: EndBreakCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.endBreak(command).commit();
  }

  async handleEndBreakdownCommand(command: EndBreakdownCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.endBreakdown(command).commit();
  }

  async handleStartBreakCommand(command: StartBreakCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.startBreak(command).commit();
  }

  async handleStartBreakdownCommand(command: StartBreakdownCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.id);
    workDay?.startBreakdown(command).commit();
  }

  async handleUpdateWorkdayCommand(command: UpdateWorkdayCommand) {
    const workDay = await this.workDayRepository.rehydrate(command.data.id);
    workDay?.updateWorkDay(command).commit();
  }

  async handleRequestClockInOverrideCommand(
    command: RequestClockInOverrideCommand,
  ) {
    const id = uuidv4();
    const override = await this.overrideRequestRepository.rehydrate(id, true);
    override?.requestClockInOverride(command).commit();
  }

  async handleRequestClockOutOverrideCommand(
    command: RequestClockOutOverrideCommand,
  ) {
    const id = uuidv4();
    const override = await this.overrideRequestRepository.rehydrate(id, true);
    override?.requestClockOutOverride(command).commit();
  }
}
