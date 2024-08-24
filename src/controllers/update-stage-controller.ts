import { UpdateStage } from '@/usecases/update-stage';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class UpdateStageController implements Controller {
  constructor(private readonly useCase: UpdateStage) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stagePayload = { ...HttpRequest.body, id: HttpRequest.params.id };
      await this.useCase.perform(stagePayload, HttpRequest.user);
      return {
        body: undefined,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const NotFoundError = error.constructor.name === RequestErrorNames.NOT_FOUND;

      if (BadRequestError || NotFoundError) {
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
