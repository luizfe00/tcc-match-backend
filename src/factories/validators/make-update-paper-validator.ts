import { PayloadValidation } from '@/usecases/validations/payload';
import { Validator } from './validator';
import Joi from 'joi';
import { PaperPayload } from '@/models/paper';

export const makeUpdatePaperValidator = (): Validator => {
  const joiSchema = Joi.object<PaperPayload>({
    approved: Joi.boolean().optional(),
    ptccDocumentUrl: Joi.string().optional(),
    tccDocumentUrl: Joi.string().optional(),
  });

  return new PayloadValidation<PaperPayload>(joiSchema);
};
