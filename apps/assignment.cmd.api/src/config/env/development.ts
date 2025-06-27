import { Config } from '../interfaces';
import { buildConfiguration } from '@cargopilot/common-types-and-helpers';

const kafkaBrokers: string[] = ['localhost:9092'];

const config: Config = {
  http: {
    port: process.env.PORT || 3007,
  },
  event_store_url: 'mongodb://localhost:27017/assignments-eventstore',
  kafkaSettings: {
    server: buildConfiguration(kafkaBrokers, false).assignmentCmdApi,
    client: buildConfiguration(kafkaBrokers, true).assignmentCmdApi,
  },
};

module.exports = config;
