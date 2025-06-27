import { CheckPoint, LifecycleCommand } from '../../interfaces';
import { WorkDayStatusEnum } from '../../enums';
export class ClockOutCommand implements LifecycleCommand {
    readonly id: string;
    readonly updatedBy: string;
    readonly checkPoint: CheckPoint;
    readonly overrideId?: string;
    readonly odometerEnd?: number;
    readonly status: WorkDayStatusEnum;
    readonly updatedAt: Date;
    constructor(id: string, updatedBy: string, checkPoint: CheckPoint, overrideId?: string, odometerEnd?: number) {
      this.id = id;
      this.updatedBy = updatedBy;
      this.checkPoint = checkPoint;
      this.overrideId = overrideId;
      this.odometerEnd = odometerEnd;
      this.status = WorkDayStatusEnum.COMPLETED;
    };
}

