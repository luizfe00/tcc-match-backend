import { ListPendingApprovals } from '@/usecases/list-pending-approvals';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class ListPendingApprovalsController implements Controller {
  constructor(private readonly useCase: ListPendingApprovals) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const approvals = await this.useCase.perform(HttpRequest.token);
      return {
        body: approvals,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const badRequest = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (badRequest) {
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
