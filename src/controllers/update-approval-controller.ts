import { UpdateApproval } from '@/usecases/update-approval';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class UpdateApprovalController implements Controller {
  constructor(private readonly useCase: UpdateApproval) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = {
        ...HttpRequest.body,
        id: HttpRequest.params.id,
      };
      await this.useCase.perform(payload, HttpRequest.token);
      return {
        body: undefined,
        statusCode: StatusCodes.OK,
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
