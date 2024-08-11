import { GetPaper } from '@/usecases/get-paper';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class GetPaperController implements Controller {
  constructor(private readonly useCase: GetPaper) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const paper = await this.useCase.perform(HttpRequest.params.id, HttpRequest.token);
      return {
        body: paper,
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
