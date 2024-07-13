import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class UnauthorizedError extends Error {
  public httpStatus = StatusCodes.UNAUTHORIZED;
  constructor() {
    super('Unauthorized');
    this.name = RequestErrorNames.UNAUTHORIZED;
  }
}
