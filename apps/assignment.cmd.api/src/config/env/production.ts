/* Env specific config */
import { Config } from "../interfaces";
import { buildConfiguration } from "@cargopilot/common-types-and-helpers";

const kafkaBrokers = [
  process.env.PRODUCTION_KAFKA_NODE_1!,
  process.env.PRODUCTION_KAFKA_NODE_2!,
  process.env.PRODUCTION_KAFKA_NODE_3!,
];

const config: Config = {
  http: {
    port: process.env.PORT || 3007,
  },
  event_store_url: process.env.ASSIGNMENT_EVENT_STORE_URL_PRODUCTION!,
  kafkaSettings: {
    server: buildConfiguration(kafkaBrokers, false).assignmentCmdApi,
    client: buildConfiguration(kafkaBrokers, true).assignmentCmdApi,
  },
};

module.exports = config;
  
