import { AttachmentDocument, CheckPoint } from '../../interfaces';
export class StartBreakdownCommand {
    readonly id: string;
    readonly updatedBy: string;
    readonly checkPoint: CheckPoint;
    readonly description: string;
    readonly documents?: AttachmentDocument[];
    readonly updatedAt: Date;
    constructor(id: string, updatedBy: string, checkPoint: CheckPoint, description: string, documents?: AttachmentDocument[]){
      this.id = id;
      this.updatedBy = updatedBy;
      this.checkPoint = checkPoint;
      this.description = description;
      this.documents = documents;
      this.updatedAt = new Date();
    };
}

