import Joi from 'joi';
import { Validator } from './validator';
import { PayloadValidation } from '@/usecases/validations/payload';
import { PaperPayload } from '@/models/paper';

export const makeCreatePTCCValidator = (): Validator => {
  const joiSchema = Joi.object<PaperPayload>({
    documentUrl: Joi.string().default(''),
    professorId: Joi.string().uuid().required(),
    studentId: Joi.string().uuid().required(),
    themeId: Joi.string().uuid().required(),
    startDate: Joi.date().greater('now').iso().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).iso().required(),
  });

  return new PayloadValidation(joiSchema);
};
