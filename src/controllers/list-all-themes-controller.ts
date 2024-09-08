import { ListAllThemes } from '@/usecases/list-all-themes';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class ListAllThemesController implements Controller {
  constructor(private readonly listAllThemes: ListAllThemes) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const themes = await this.listAllThemes.perform(request.user);

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
