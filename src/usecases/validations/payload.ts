import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';
import { HttpResponse } from '@/controllers/ports';
import { Validator } from '@/factories/validators/validator';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export class PayloadValidation<T> implements Validator {
  constructor(private readonly joiSchema: ObjectSchema<T>) {}

  validate(req: Request, res: Response, next: NextFunction): HttpResponse | void {
    const { error } = this.joiSchema.validate(req.body);
    if (error) {
      return {
        body: {
          errorType: RequestErrorNames.BAD_REQUEST,
          message: error.details[0].message,
        },
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    next();
  }
}
