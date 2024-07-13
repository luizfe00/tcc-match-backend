import { Validator } from '@/factories/validators/validator';
import { NextFunction, Request, Response } from 'express';

export function adaptValidator(validator: Validator) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validatorResponse = validator.validate(req, res, next);
    if (validatorResponse) res.status(validatorResponse.statusCode).json(validatorResponse.body);
  };
}
