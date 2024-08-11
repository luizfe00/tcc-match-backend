import Joi from 'joi';
import { Validator } from './validator';
import { PayloadValidation } from '@/usecases/validations/payload';
import { Approval } from '@/models/approval';
import { PaperType } from '@prisma/client';

export const makeCreateApprovalValidator = (): Validator => {
  const joiSchema = Joi.object<Approval>({
    paperId: Joi.string().uuid().required(),
    type: Joi.string().valid(...Object.values(PaperType)),
  });

  return new PayloadValidation(joiSchema);
};
