import { IValidationErrorToUser } from "./interfaces";
export declare class ErrorHandler {
    private readonly logger;
    private readonly exceptions;
    constructor(logger: any);
    handleException(msg: string, recipient: string, emmitCallback: (data: IValidationErrorToUser) => void): (e: any) => void;
}

