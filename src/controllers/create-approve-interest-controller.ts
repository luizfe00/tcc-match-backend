import { ApproveInterest } from '@/usecases/approve-interest';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class ApproveInterestController implements Controller {
  constructor(private readonly useCase: ApproveInterest) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const ptcc = await this.useCase.perform(HttpRequest.body, HttpRequest.token);
      return {
        body: ptcc,
        statusCode: StatusCodes.CREATED,
      };
    } catch (error) {
      const NotFoundError = error.constructor.name === RequestErrorNames.NOT_FOUND;
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const ExistingEntityError = error.constructor.name === RequestErrorNames.EXISTING_ENTITY;

      if (NotFoundError || BadRequestError || ExistingEntityError) {
        return {
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
          statusCode: error.httpStatus,
        };
      }

      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error,
      };
    }
  }
}
