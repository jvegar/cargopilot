import { IQuery } from '@nestjs/cqrs';
import { InterviewStatusEnum } from '../enums';
export class GetAssignmentPendingInterviewQuery implements IQuery {
    readonly assignmentId: string;
    readonly status: InterviewStatusEnum;
    constructor(assignmentId: string){
      this.assignmentId = assignmentId;
      this.status = InterviewStatusEnum.SCHEDULED;
    };
}

