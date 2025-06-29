import { StorableEvent } from '@cargopilot/event-sourcing';
import { AttachmentDocument, CheckPoint } from '../../interfaces';
import { EventAggregateEnum } from '../../enums';
export class BreakdownStartedEvent extends StorableEvent {
    readonly id: string;
    readonly assignmentId: string;
    readonly start: CheckPoint;
    readonly breakdownId: string;
    readonly description: string;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    readonly documents?: AttachmentDocument[];
    eventAggregate: EventAggregateEnum;
    eventVersion: number;
    constructor(id: string, assignmentId: string, start: CheckPoint, breakdownId: string, description: string, updatedBy: string, updatedAt: Date, documents?: AttachmentDocument[]) {
      super();
      this.id = id;
      this.assignmentId = assignmentId;
      this.start = start;
      this.breakdownId = breakdownId;
      this.description = description;
      this.updatedBy = updatedBy;
      this.updatedAt = updatedAt;
      this.documents = documents;
      this.eventAggregate = EventAggregateEnum.WORK_DAY;
      this.eventVersion = 1;
    };
}

