import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { Validator } from '@/factories/validators/validator';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class AuthenticationValidation implements Validator {
  validate(req: HttpRequest, res: Response, next: NextFunction): HttpResponse | void {
    const token = req.headers.authorization?.split('Bearer ')?.[1];

    if (!token) {
      return {
        body: {
          errorType: RequestErrorNames.BAD_REQUEST,
          message: 'Missing authentication token',
        },
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    try {
      jwt.verify(token, 'secret');
      req.token = token as string;
      next();
    } catch (error) {
      return {
        body: {
          errorType: RequestErrorNames.UNAUTHORIZED,
          message: error.message,
        },
        statusCode: StatusCodes.UNAUTHORIZED,
      };
    }
  }
}
