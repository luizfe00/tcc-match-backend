import { CreateApproval } from '@/usecases/create-approval';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class CreateApprovalController implements Controller {
  constructor(private readonly useCase: CreateApproval) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const approval = await this.useCase.perform(HttpRequest.body, HttpRequest.token);
      return {
        body: approval,
        statusCode: StatusCodes.CREATED,
      };
    } catch (error) {
      const entityNotFound = error.constructor.name === RequestErrorNames.NOT_FOUND;
      const badRequest = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (entityNotFound || badRequest) {
        return {
          statusCode: error.httpStatus,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }

      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error,
      };
    }
  }
}
