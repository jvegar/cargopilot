import { ClientKafka } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface ServiceClient {
  client: ClientKafka;

  send<R>(pattern: string, data: any): Promise<R>;
  emit(pattern: string, data: any): Observable<any>;
};
