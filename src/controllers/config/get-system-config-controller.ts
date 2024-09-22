import { Controller, HttpRequest, HttpResponse } from '../ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';
import { GetSystemConfig } from '@/usecases/config/get-system-config';

export class GetSystemConfigController implements Controller {
  constructor(private readonly useCase: GetSystemConfig) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const systemConfig = await this.useCase.perform(HttpRequest.user);
      return {
        body: systemConfig,
        statusCode: StatusCodes.OK,
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
