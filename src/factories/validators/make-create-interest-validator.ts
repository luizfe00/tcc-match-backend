import Joi from 'joi';
import { Validator } from './validator';
import { Interest } from '@/models/interest';
import { PayloadValidation } from '@/usecases/validations/payload';

export const makeCreateInterestValidator = (): Validator => {
  const joiSchema = Joi.object<Interest>({
    themeId: Joi.string().uuid().required(),
    text: Joi.string().min(5).required(),
  });

  return new PayloadValidation(joiSchema);
};
