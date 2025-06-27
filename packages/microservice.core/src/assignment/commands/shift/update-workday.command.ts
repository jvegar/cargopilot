import { UpdateWorkDayDto } from '../../dto';
export class UpdateWorkdayCommand {
    readonly data: UpdateWorkDayDto;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    constructor(data: UpdateWorkDayDto, updatedBy: string) {
      this.data = data;
      this.updatedBy = updatedBy;
      this.updatedAt = new Date();
    };
}

