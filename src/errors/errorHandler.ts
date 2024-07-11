import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from './HttpStatusCodes';
import { CustomError } from './customError';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || HttpStatusCode.InternalServerError;
    const message = err.message || 'Internal Server Error';
    console.error(`Error: ${message}`);
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};

export default errorHandler;
