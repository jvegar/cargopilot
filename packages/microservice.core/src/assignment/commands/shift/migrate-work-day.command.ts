import { Workday } from '../../interfaces';
export class MigrateWorkDayCommand {
    readonly data: Workday;
    constructor(data: Workday) {
      this.data = data;
    };
}

