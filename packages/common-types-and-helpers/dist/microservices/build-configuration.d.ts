export declare function buildConfiguration(brokers: string[], isClient: boolean): {
    haulApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    documentService: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    orderCmdApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    orderQueryApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    assignmentCmdApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    assignmentQueryApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    invoiceCmdApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
    invoiceQueryApi: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    } | {
        client: {
            brokers: string[];
            clientId?: undefined;
        };
        consumer: {
            groupId: string;
        };
    };
};
//# sourceMappingURL=build-configuration.d.ts.map