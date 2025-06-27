import { CheckPoint } from '../../interfaces';
export class EndBreakdownCommand {
    readonly id: string;
    readonly checkPoint: CheckPoint;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    constructor(id: string, checkPoint: CheckPoint, updatedBy: string) {
      this.id = id;
      this.checkPoint = checkPoint;
      this.updatedBy = updatedBy;
      this.updatedAt = new Date();
    };
}

