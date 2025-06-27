/** Env spicific config */
import { Config } from '../interfaces';
import { buildConfiguration } from "@cargopilot/common-types-and-helpers";

const kafkaBrokers: string[] =  [
  process.env.STAGING_KAFKA_NODE_1!,
  process.env.STAGING_KAFKA_NODE_2!,
  process.env.STAGING_KAFKA_NODE_3!,
];

const config: Config = {
  http: {
    port: process.env.PORT || 3007,
  },
  event_store_url: process.env.ASSIGNMENT_EVENT_STORE_URL!,
  kafkaSettings: {
    server: buildConfiguration(kafkaBrokers, false).assignmentCmdApi,
    client: buildConfiguration(kafkaBrokers, true).assignmentCmdApi,
  },
};

module.exports = config;
