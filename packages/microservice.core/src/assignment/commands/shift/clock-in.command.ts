import { CheckPoint } from '../../interfaces';
import { WorkDayStatusEnum } from '../../enums';

export class ClockInCommand {
  readonly assignmentId: string;
  readonly createdBy: string;
  readonly checkPoint: CheckPoint;
  readonly overrideId: string;
  readonly odometerStart?: number;
  readonly createdAt: Date;
  readonly status: WorkDayStatusEnum;
    
  constructor(assignmentId, createdBy, checkPoint, overrideId, odometerStart) {
    this.assignmentId = assignmentId;
    this.createdBy = createdBy;
    this.checkPoint = checkPoint;
    this.overrideId = overrideId;
    this.odometerStart = odometerStart;
    this.createdAt = new Date();
    this.status = WorkDayStatusEnum.INITIAL;
  }
}

