import { PayloadValidation } from '@/usecases/validations/payload';
import { Validator } from './validator';
import { Theme } from '@/models/theme';
import Joi from 'joi';

export const makeCreateThemeValidator = (): Validator => {
  const joiSchema = Joi.object<Theme>({
    duration: Joi.number().required(),
    summary: Joi.string().min(20).required(),
    label: Joi.string().min(5).required(),
  });

  return new PayloadValidation<Theme>(joiSchema);
};
