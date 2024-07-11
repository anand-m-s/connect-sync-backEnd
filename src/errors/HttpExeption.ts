import createError from 'http-errors';
import { HttpStatusCode } from './HttpStatusCodes';

export class BadRequestException extends Error {
    constructor(message = 'Bad Request') {
        super(message);
        this.name = 'BadRequestException';
        throw createError(HttpStatusCode.BadRequest, message);
    }
}

export class UnauthorizedException extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedException';
        throw createError(HttpStatusCode.Unauthorized, message);
    }
}

export class ForbiddenException extends Error {
    constructor(message = 'Forbidden') {
        super(message);
        this.name = 'ForbiddenException';
        throw createError(HttpStatusCode.Forbidden, message);
    }
}

export class InternalServerErrorException extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerErrorException';
        throw createError(HttpStatusCode.InternalServerError, message);
    }
}

