import { CreateStage } from '@/usecases/create-stage';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class CreateStageController implements Controller {
  constructor(private readonly useCase: CreateStage) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stage = await this.useCase.perform(HttpRequest.body, HttpRequest.user);
      return {
        body: stage,
        statusCode: StatusCodes.CREATED,
      };
    } catch (error) {
      const badRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (badRequestError) {
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
