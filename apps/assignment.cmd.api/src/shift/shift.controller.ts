import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClockInCommand } from '@cargopilot/microservice.core';
import { ErrorHandler, IKafkaMessage } from '@cargopilot/common-types-and-helpers';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ShiftService } from './shift.service';
import { MigrateWorkDayOverrideCommand } from '@cargopilot/microservice.core';

@Controller()
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {
    this.shiftService = shiftService;
  }
}
