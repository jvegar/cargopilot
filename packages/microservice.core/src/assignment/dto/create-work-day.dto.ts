import { Break, Breakdown, CheckPoint, Stop } from '../interfaces';
import { CheckPointShiftDto } from './check-point-shift.dto';
export class CreateWorkDayDto {
    assignmentId: string;
    clockIn: CheckPointShiftDto;
    clockOut: CheckPoint;
    breaks?: Break[];
    breakdowns?: Breakdown[];
    odometerStart?: number;
    odometerEnd?: number;
    stops?: Stop[];
}

