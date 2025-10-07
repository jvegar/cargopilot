import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddStopCommand,
  ClockInCommand,
  ClockOutCommand,
  CreateWorkdayCommand,
  DeleteWorkdayCommand,
  EndBreakCommand,
} from '@cargopilot/microservice.core';
import {
  ErrorHandler,
  IKafkaMessage,
} from '@cargopilot/common-types-and-helpers';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ShiftService } from './shift.service';
import { MigrateWorkDayOverrideCommand } from '@cargopilot/microservice.core';

@Controller()
export class ShiftController {
  private readonly errorHandler: ErrorHandler;

  constructor(
    @InjectPinoLogger(ShiftController.name)
    private readonly logger: PinoLogger,
    private readonly shiftService: ShiftService,
  ) {
    this.errorHandler = new ErrorHandler(logger);
  }

  private exceptionHandler(msg: string, recipient: string) {
    return this.errorHandler.handleException(msg, recipient, (error) =>
      this.shiftService.emitErrorToGateway(error),
    );
  }

  @MessagePattern(ClockInCommand.name)
  onClockInCommand(@Payload() message: IKafkaMessage<ClockInCommand>) {
    this.logger.info(message);
    this.shiftService
      .handleClockInCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleClockInCommand() exception',
          message.value.createdBy,
        ),
      );
  }

  @MessagePattern(AddStopCommand.name)
  onAddStopCommand(@Payload() message: IKafkaMessage<AddStopCommand>) {
    this.logger.info(message);
    this.shiftService
      .handleAddStopCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleAddStopCommand() exception',
          message.value.updatedBy,
        ),
      );
  }

  @MessagePattern(ClockOutCommand.name)
  onClockOutCommand(@Payload() message: IKafkaMessage<ClockOutCommand>) {
    this.logger.info(message);
    this.shiftService
      .handleClockOutCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleClockOutCommand() exception',
          message.value.updatedBy,
        ),
      );
  }

  @MessagePattern(CreateWorkdayCommand.name)
  onCreateWorkdayCommand(
    @Payload() message: IKafkaMessage<CreateWorkdayCommand>,
  ) {
    this.logger.info(message);
    this.shiftService
      .handleCreateWorkDayCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleCreateWorkDayCommand() exception',
          message.value.createdBy,
        ),
      );
  }

  @MessagePattern(DeleteWorkdayCommand.name)
  onDeleteWorkdayCommand(
    @Payload() message: IKafkaMessage<DeleteWorkdayCommand>,
  ) {
    this.logger.info(message);
    this.shiftService
      .handleDeleteWorkdayCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleDeleteWorkdayCommand() exception',
          message.value.updatedBy,
        ),
      );
  }

  @MessagePattern(EndBreakCommand.name)
  onEndBreakCommand(@Payload() message: IKafkaMessage<EndBreakCommand>) {
    this.logger.info(message);
    this.shiftService
      .handleEndBreakCommand(message.value)
      .catch(
        this.exceptionHandler(
          'handleEndBreakCommand() exception',
          message.value.updatedBy,
        ),
      );
  }
}
