import { StorableEvent } from '@cargopilot/event-sourcing';
import { UpdateWorkDayPayload } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';

export class WorkDayUpdatedEvent extends StorableEvent {
  readonly id: string;
  readonly editedWorkday: UpdateWorkDayPayload;
  readonly updatedBy: string;
  readonly updatedAt: Date;
  eventAggregate: EventAggregateEnum;
  eventVersion: number;
  constructor(
    id: string,
    editedWorkday: UpdateWorkDayPayload,
    updatedBy: string,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.editedWorkday = editedWorkday;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.eventAggregate = EventAggregateEnum.WORK_DAY;
    this.eventVersion = 1;
  }
}
