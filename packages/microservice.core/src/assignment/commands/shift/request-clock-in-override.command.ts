import { CheckPoint } from '../../interfaces';
export class RequestClockInOverrideCommand {
    readonly assignmentId: string;
    readonly createdBy: string;
    readonly checkPoint: CheckPoint;
    readonly notes?: string;
    readonly odometerStart?: number;
    readonly createdAt: Date;
    constructor(assignmentId: string, createdBy: string, checkPoint: CheckPoint, notes?: string, odometerStart?: number) {
      this.assignmentId = assignmentId;
      this.createdBy = createdBy;
      this.checkPoint = checkPoint;
      this.notes = notes;
      this.odometerStart = odometerStart;
      this.createdAt = this.createdAt;
    };
}

