import Joi from 'joi';
import { Validator } from './validator';
import { PayloadValidation } from '@/usecases/validations/payload';
import { Approval } from '@/models/approval';

export const makeUpdateApprovalValidator = (): Validator => {
  const joiSchema = Joi.object<Approval>({
    response: Joi.string().optional(),
    approval: Joi.boolean().optional(),
    paperId: Joi.string().required(),
  });

  return new PayloadValidation(joiSchema);
};
