import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class BadRequestError extends Error {
  public httpStatus = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
    this.name = RequestErrorNames.BAD_REQUEST;
  }
}
