import { CheckPoint } from '../../interfaces';
export class AddStopCommand {
    readonly id: string;
    readonly updatedBy: string;
    readonly checkPoint: CheckPoint;
    readonly notes?: string;
    readonly updatedAt: Date;
    constructor(id: string, updatedBy: string, checkPoint: CheckPoint, notes?: string) {
      this.id = id;
      this.updatedBy = updatedBy;
      this.checkPoint = checkPoint;
      this.notes = notes;
      this.updatedAt = new Date();
    };
}
