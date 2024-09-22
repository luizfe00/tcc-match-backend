import { UpdateSystemConfig } from '@/usecases/config/update-system-config';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class UpdateSystemConfigController implements Controller {
  constructor(private readonly useCase: UpdateSystemConfig) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.useCase.perform(HttpRequest.body, HttpRequest.user);
      return {
        body: undefined,
        statusCode: StatusCodes.UPDATED,
      };
    } catch (error) {
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (BadRequestError) {
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
