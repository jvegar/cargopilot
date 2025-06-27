import { KafkaSettings } from "./kafka-settings.interface";

export interface Config {
  http: any;
  event_store_url: string;
  kafkaSettings: KafkaSettings;
}
