import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class NotFoundError extends Error {
  public httpStatus = StatusCodes.NOT_FOUND;
  constructor(entity: string, id: string) {
    super(`${entity} not found for id: ${id}`);
    this.name = RequestErrorNames.NOT_FOUND;
  }
}
