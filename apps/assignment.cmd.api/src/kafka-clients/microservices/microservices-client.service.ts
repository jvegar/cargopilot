import { Client, ClientKafka, Transport } from "@nestjs/microservices";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { GetOrderByIdQuery } from "@cargopilot/microservice.core";
import { firstValueFrom, Observable } from "rxjs";
import { ServiceClient } from "../interfaces";
import config from '../../config';
import { GetAssignmentPendingInterviewQuery } from "@cargopilot/microservice.core";

const queries = [
  GetOrderByIdQuery.name,
  GetAssignmentPendingInterviewQuery.name,
];

@Injectable()
export class MicroservicesClient implements OnModuleInit, ServiceClient {
  @Client({
    transport: Transport.KAFKA,
    options: config.kafkaSettings.client,
  })
  client: ClientKafka;

  async onModuleInit() {
    queries.forEach((query: string) =>
                    this.client.subscribeToResponseOf(query),
                   );
                   await this.client.connect();
  }

  async send<R>(pattern: string, data: any): Promise<R> {
    const response = await firstValueFrom(this.client.send<R>(pattern, data));
    return response;
  }

  emit(pattern: string, data: any): Observable<any>{
    return this.client.emit(pattern, data);
  }
};
