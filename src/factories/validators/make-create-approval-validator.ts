import Joi from 'joi';
import { Validator } from './validator';
import { PayloadValidation } from '@/usecases/validations/payload';
import { Approval } from '@/models/approval';

export const makeCreateApprovalValidator = (): Validator => {
  const joiSchema = Joi.object<Approval>({
    paperId: Joi.string().uuid().required(),
  });

  return new PayloadValidation(joiSchema);
};
