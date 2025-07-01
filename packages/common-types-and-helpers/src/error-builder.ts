import { IValidationError } from "./interfaces";
export enum domainsEnum {
    ORDER = "ORDER",
    ASSIGNMENT = "ASSIGNMENT",
    INTERVIEW = "INTERVIEW",
    SHIFT = "SHIFT",
    INVOICE = "INVOICE"
}
export class ErrorBuilder {
    private readonly domain?;
    constructor(domain?: domainsEnum) {
      this.domain = domain;
    };
    get UnhandledException(): IValidationError {
        return {
            isCustomError: true,
            statusCode: 500,
            message: 'Unhandled service error!',
        };

    };
    get NotFoundException(): IValidationError;
    get InvalidWorkDay(): IValidationError;
    get ActiveBreak(): IValidationError;
    get ActiveClockOut(): IValidationError;
}
