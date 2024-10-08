import { PayloadValidation } from '@/usecases/validations/payload';
import { Validator } from './validator';
import { Theme } from '@/models/theme';
import Joi from 'joi';

export const makeCreateThemeValidator = (): Validator => {
  const joiSchema = Joi.object<Theme>({
    summary: Joi.string().min(20).required(),
    label: Joi.string().min(5).required(),
    startDate: Joi.date().greater('now').iso().optional(),
    duration: Joi.number().required().min(30).max(180),
  });

  return new PayloadValidation<Theme>(joiSchema);
};
