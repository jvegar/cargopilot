import { OverrideStatusEnum, OverrideTypeEnum } from '../enums';
import { ActionLog, CheckPoint } from './';
export interface OverrideRequest extends ActionLog {
  readonly id: string;
  status: OverrideStatusEnum;
  type: OverrideTypeEnum;
  assignmentId: string;
  workDayId: string;
  checkPoint: CheckPoint;
  notes?: string;
  odometerStart?: number;
  odometerEnd?: number;
}
