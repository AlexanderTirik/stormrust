import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorCode } from '../../common/enums/ErrorCode';
import CustomError from '../../common/errors/CustomError';
import { IAccessToken } from '../../common/models/auth/IAccessToken';
import { env } from '../../env';

const { secret } = env.app;

export const jwtHeaderMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError(400, 'JWT token is invalid', ErrorCode.InvalidAuthToken);
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw error;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const { id } = jwt.verify(token, secret) as IAccessToken;
    req.user = {
      id
    };
  } catch (e) {
    throw error;
  }
  next();
};
