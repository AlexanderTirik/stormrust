import CustomError from '../../common/errors/CustomError';
import * as express from 'express';

export default (err: CustomError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(err.status || 500).send({
		message: err.message,
		code: err.errorCode
	});
};
