import { ListAllPapers } from '@/usecases/list-all-papers';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class ListAllPapersController implements Controller {
  constructor(private readonly useCase: ListAllPapers) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themes = await this.useCase.perform(HttpRequest.user);

      return {
        body: themes,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const badRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (badRequestError) {
        return {
          body: error.message,
          statusCode: StatusCodes.BAD_REQUEST,
        };
      }

      return {
        body: error.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
