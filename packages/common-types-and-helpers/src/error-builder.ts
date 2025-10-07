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
  get NotFoundException(): IValidationError {
    return {
      isCustomError: true,
      statusCode: 404,
      message: `${this.domain}: Entity not found!`,
    };
  };
  get InvalidWorkDay(): IValidationError {
    return {
      isCustomError: true,
      statusCode: 400,
      message: `Invalid WorkDay record!`,
    };
  };
  get ActiveBreak(): IValidationError {
    return {
      isCustomError: true,
      statusCode: 409,
      message: `You have active break!`,
    };
  };
  get ActiveClockOut(): IValidationError {
    return {
      isCustomError: true,
      statusCode: 409,
      message: `Clock Out already done!`,
    };
  };
}
