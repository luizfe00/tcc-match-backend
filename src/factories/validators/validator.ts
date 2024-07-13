import { HttpResponse } from '@/controllers/ports';
import { NextFunction, Request, Response } from 'express';

export interface Validator {
  validate(req: Request, res: Response, next: NextFunction): HttpResponse | void;
}
