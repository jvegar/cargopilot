export class DeleteWorkdayCommand {
    readonly id: string;
    readonly updatedBy: string;
    readonly updatedAt: Date;
    constructor(id: string, updatedBy: string) {
      this.id = id;
      this.updatedBy = updatedBy;
      this.updatedAt = new Date();
    };
}

