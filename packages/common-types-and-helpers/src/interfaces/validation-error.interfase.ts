export interface IValidationErrorObject {
    [key: string]: IValidationError;
}
export interface IValidationErrorObjectResponse {
    [key: string]: IValidationErrorToUser;
}
export interface IValidationError {
    isCustomError: boolean;
    message: string;
    statusCode: number;
}
export interface IValidationErrorToUser extends Omit<IValidationError, 'isCustomError'> {
    recipient: string;
}

