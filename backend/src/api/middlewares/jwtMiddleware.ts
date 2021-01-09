import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ErrorCode } from "../../common/enums/ErrorCode";
import CustomError from "../../common/errors/CustomError";
import { env } from "../../env";

const { secret } = env.app; 

export const jwtHeaderMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const error = new CustomError(400, 'JWT token is invalid', ErrorCode.InvalidAuthToken);
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        throw error;
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        jwt.verify(token, secret)
    } catch (e) {
        throw error;
    }
    next();
}