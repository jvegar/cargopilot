import { AssignmentStatusEnum, InterviewStatusEnum, WorkDayStatusEnum } from '../enums';
export interface LifecycleCommand {
    readonly id: string;
    readonly declineReason?: string;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    readonly status: AssignmentStatusEnum | InterviewStatusEnum | WorkDayStatusEnum;
}

