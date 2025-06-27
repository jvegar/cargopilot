import { OverrideRequest } from '../../interfaces';
export class MigrateWorkDayOverrideCommand {
    readonly data: OverrideRequest;
    constructor(data: OverrideRequest){
      this.data = data;
    };
}

