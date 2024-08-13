import { PayloadValidation } from '@/usecases/validations/payload';
import { Validator } from './validator';
import Joi from 'joi';
import { StagePayload } from '@/models/stage';

export const makeCreateStageValidator = (): Validator => {
  const joiSchema = Joi.object<StagePayload>({
    label: Joi.string().required(),
    paperId: Joi.string().uuid().required(),
    documentUrl: Joi.string().uri().required(),
    message: Joi.string().optional(),
  });

  return new PayloadValidation<StagePayload>(joiSchema);
};
