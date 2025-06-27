import {
  ConsumerConfig,
  KafkaConfig,
} from '@nestjs/microservices/external/kafka.interface';

interface BasicKafkaOptions {
  client?: KafkaConfig;
  consumer?: ConsumerConfig;
}

export interface KafkaSettings {
  server: BasicKafkaOptions;
  client: BasicKafkaOptions;
}


