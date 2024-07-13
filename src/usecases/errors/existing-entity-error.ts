import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class ExistingEntityError extends Error {
  public httpStatus = StatusCodes.EXISTING_ENTITY;
  constructor(entityName: string, uniqueProperty: string, propertyValue: string) {
    super(`Entity ${entityName} with ${uniqueProperty} ${propertyValue} already exists`);
    this.name = RequestErrorNames.EXISTING_ENTITY;
  }
}
