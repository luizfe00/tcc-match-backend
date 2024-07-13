import Joi from 'joi';
import { Student } from '@/models/student';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '@/constants/SatusCode';
import { HttpResponse } from '@/controllers/ports';
import { RequestErrorNames } from '@/constants/Errors';
import { Validator } from '@/factories/validators/validator';

export class CreateStudentValidator implements Validator {
  private readonly joiSchema = Joi.object<Student>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    enrollment: Joi.string().regex(/^\d+$/).required(),
  });

  constructor() {
    // Bind the validate method to the class instance
    this.validate = this.validate.bind(this);
  }

  validate(req: Request, res: Response, next: NextFunction): HttpResponse | void {
    const { error } = this.joiSchema.validate(req.body);
    console.log({ error });
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
