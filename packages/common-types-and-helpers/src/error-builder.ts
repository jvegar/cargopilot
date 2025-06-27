import { IValidationError } from "./interfaces";
export declare enum domainsEnum {
    ORDER = "ORDER",
    ASSIGNMENT = "ASSIGNMENT",
    INTERVIEW = "INTERVIEW",
    SHIFT = "SHIFT",
    INVOICE = "INVOICE"
}
export declare class ErrorBuilder {
    private readonly domain?;
    constructor(domain?: domainsEnum);
    get UnhandledException(): IValidationError;
    get NotFoundException(): IValidationError;
    get InvalidWorkDay(): IValidationError;
    get ActiveBreak(): IValidationError;
    get ActiveClockOut(): IValidationError;
}
