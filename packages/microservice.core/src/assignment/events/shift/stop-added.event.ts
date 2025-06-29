import { StorableEvent } from '@cargopilot/event-sourcing';
import { CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';
export class StopAddedEvent extends StorableEvent {
    readonly id: string;
    readonly assignmentId: string;
    readonly checkpoint: CheckPoint;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    readonly notes?: string;
    eventAggregate: EventAggregateEnum;
    eventVersion: number;

    constructor(id: string, assignmentId: string, checkpoint: CheckPoint, updatedBy: string, updatedAt: Date, notes?: string) {
      super();
      this.id = id;
      this.assignmentId = assignmentId;
      this.checkpoint = checkpoint;
      this.updatedBy = updatedBy;
      this.updatedAt = updatedAt;
      this.notes = notes;
      this.eventAggregate = EventAggregateEnum.WORK_DAY;
      this.eventVersion = 1;
    };
}
