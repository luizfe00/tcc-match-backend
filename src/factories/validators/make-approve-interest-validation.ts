import Joi from 'joi';
import { Validator } from './validator';
import { PayloadValidation } from '@/usecases/validations/payload';
import { PaperPayload } from '@/models/paper';

export const makeApproveInterestValidator = (): Validator => {
  const joiSchema = Joi.object<PaperPayload>({
    professorId: Joi.string().uuid().required(),
    studentId: Joi.string().uuid().required(),
    themeId: Joi.string().uuid().required(),
    interestId: Joi.string().uuid().required(),
  });

  return new PayloadValidation(joiSchema);
};
