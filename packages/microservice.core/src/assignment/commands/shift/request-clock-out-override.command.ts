import { CheckPoint } from '../../interfaces';
export class RequestClockOutOverrideCommand {
    readonly assignmentId: string;
    readonly workDayId: string;
    readonly createdBy: string;
    readonly checkPoint: CheckPoint;
    readonly notes?: string;
    readonly odometerEnd?: number;
    readonly createdAt: Date;
    constructor(assignmentId: string, workDayId: string, createdBy: string, checkPoint: CheckPoint, notes?: string, odometerEnd?: number) {
      this.assignmentId = assignmentId;
      this.workDayId = workDayId;
      this.createdBy = createdBy;
      this.checkPoint = checkPoint;
      this.notes = notes;
      this.odometerEnd = odometerEnd;
    };
}

