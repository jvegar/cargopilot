import { CreateWorkDayDto } from '../../dto';
export class CreateWorkdayCommand {
    readonly data: CreateWorkDayDto;
    readonly createdBy: string;
    readonly createdAt: Date;
    constructor(data: CreateWorkDayDto, createdBy: string) {
      this.data = data;
      this.createdBy = createdBy;
      this.createdAt = new Date();
    };
}

