import { Module } from "@nestjs/common";
import { MicroservicesClient } from "./";

@Module({
  providers: [MicroservicesClient],
  exports: [MicroservicesClient],
})
export class TransportModule {}
