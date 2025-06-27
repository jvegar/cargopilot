import { CheckPoint } from './check-point.interface';
import { AttachmentDocument } from './attachment-document.interface';
export interface Breakdown {
    id?: string;
    description: string;
    start: CheckPoint;
    end: CheckPoint;
    attachments?: AttachmentDocument[];
}

