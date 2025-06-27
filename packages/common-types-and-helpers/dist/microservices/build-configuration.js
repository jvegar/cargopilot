"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConfiguration = buildConfiguration;
const uuid_1 = __importDefault(require("uuid"));
const haulApi = {
    clientId: `haul-api`,
    groupId: 'haul-api-consumer',
};
const documentService = {
    clientId: `document-service`,
    groupId: 'document-service-consumer',
};
const orderCmdApi = {
    clientId: `order.cmd.api`,
    groupId: 'order.cmd.api-consumer',
};
const orderQueryApi = {
    clientId: `order.query.api`,
    groupId: 'order.query.api-consumer',
};
const assignmentCmdApi = {
    clientId: `assignment.cmd.api`,
    groupId: 'assignment.cmd.api-consumer',
};
const assignmentQueryApi = {
    clientId: `assignment.query.api`,
    groupId: 'assignment.query.api-consumer',
};
const invoiceCmdApi = {
    clientId: `invoice.cmd.api`,
    groupId: 'invoice.cmd.api-consumer',
};
const invoiceQueryApi = {
    clientId: `invoice.query.api`,
    groupId: 'invoice.query.api-consumer',
};
function buildConfiguration(brokers, isClient) {
    function build(conf) {
        const { clientId, groupId } = conf;
        if (isClient) {
            return {
                client: { clientId, brokers },
                consumer: { groupId: `${groupId}-<${uuid_1.default.v4()}>` },
            };
        }
        return {
            client: { brokers },
            consumer: { groupId },
        };
    }
    return {
        haulApi: build(haulApi),
        documentService: build(documentService),
        orderCmdApi: build(orderCmdApi),
        orderQueryApi: build(orderQueryApi),
        assignmentCmdApi: build(assignmentCmdApi),
        assignmentQueryApi: build(assignmentQueryApi),
        invoiceCmdApi: build(invoiceCmdApi),
        invoiceQueryApi: build(invoiceQueryApi),
    };
}
