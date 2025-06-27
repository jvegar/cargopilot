import { WorkDayStatusEnum } from '../enums';
import { ActionLog, Break, Breakdown, CheckPoint, Stop } from './';
export interface Workday extends ActionLog {
    readonly id: string;
    assignmentId: string;
    status: WorkDayStatusEnum;
    breaks: Break[];
    breakdowns: Breakdown[];
    overrides: string[];
    clockIn: CheckPoint;
    clockOut: CheckPoint;
    activeBreak: Break;
    activeBreakdown: Breakdown;
    stops: Stop[];
    odometerStart?: number;
    odometerEnd?: number;
    timezone?: string;
}
export type CreateWorkDayPayload = Pick<Workday, 'assignmentId' | 'clockIn' | 'clockOut' | 'breaks' | 'breakdowns' | 'stops' | 'odometerStart' | 'odometerEnd'>;
export interface UpdateWorkDayPayload extends CreateWorkDayPayload {
    id: string;
}
