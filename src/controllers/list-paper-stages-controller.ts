import { ListPaperStages } from '@/usecases/list-paper-stages';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class ListPaperStagesController implements Controller {
  constructor(private readonly useCase: ListPaperStages) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stages = await this.useCase.perform(HttpRequest.params.id, HttpRequest.token);
      return {
        body: stages,
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
