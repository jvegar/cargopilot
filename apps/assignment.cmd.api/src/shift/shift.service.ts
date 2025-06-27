import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import {
  ClockInCommand,
  ClockOutCommand,
  CreateWorkDayDto,
  DeleteWorkdayCommand,
  EndBreakCommand,
  EndBreakdownCommand,
  MigrateWorkDayCommand,
  OverrideRequest,
  RequestClockInOverrideCommand,
  RequestClockOutOverrideCommand,
  StartBreakCommand,
  StartBreakdownCommand,
  UpdateWorkDayDto,
} from '@cargopilot/microservice.core';


@Injectable()
export class ShiftService {}
