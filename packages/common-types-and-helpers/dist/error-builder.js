"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBuilder = exports.domainsEnum = void 0;
var domainsEnum;
(function (domainsEnum) {
    domainsEnum["ORDER"] = "ORDER";
    domainsEnum["ASSIGNMENT"] = "ASSIGNMENT";
    domainsEnum["INTERVIEW"] = "INTERVIEW";
    domainsEnum["SHIFT"] = "SHIFT";
    domainsEnum["INVOICE"] = "INVOICE";
})(domainsEnum || (exports.domainsEnum = domainsEnum = {}));
class ErrorBuilder {
    constructor(domain) {
        this.domain = domain;
    }
    ;
    get UnhandledException() {
        return {
            isCustomError: true,
            statusCode: 500,
            message: 'Unhandled service error!',
        };
    }
    ;
    get NotFoundException() {
        return {
            isCustomError: true,
            statusCode: 404,
            message: `${this.domain}: Entity not found!`,
        };
    }
    ;
    get InvalidWorkDay() {
        return {
            isCustomError: true,
            statusCode: 400,
            message: `Invalid WorkDay record!`,
        };
    }
    ;
    get ActiveBreak() {
        return {
            isCustomError: true,
            statusCode: 409,
            message: `You have active break!`,
        };
    }
    ;
    get ActiveClockOut() {
        return {
            isCustomError: true,
            statusCode: 409,
            message: `Clock Out already done!`,
        };
    }
    ;
}
exports.ErrorBuilder = ErrorBuilder;
