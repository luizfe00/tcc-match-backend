import { PayloadValidation } from '@/usecases/validations/payload';
import { Validator } from './validator';
import { Theme } from '@/models/theme';
import Joi from 'joi';

export const makeCreateThemeValidator = (): Validator => {
  const joiSchema = Joi.object<Theme>({
    summary: Joi.string().min(20).required(),
    label: Joi.string().min(5).required(),
    startDate: Joi.date().greater('now').iso().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).iso().required(),
  });

  return new PayloadValidation<Theme>(joiSchema);
};
