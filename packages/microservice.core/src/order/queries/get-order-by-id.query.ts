import { IQuery } from '@nestjs/cqrs';
export class GetOrderByIdQuery implements IQuery {
    readonly id: string;
    constructor(id: string){
      this.id = id;
    };
}

