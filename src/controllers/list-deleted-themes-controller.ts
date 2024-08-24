import { ListDeletedThemes } from '@/usecases/list-deleted-themes';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListDeletedThemesController implements Controller {
  constructor(private readonly useCase: ListDeletedThemes) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themes = await this.useCase.perform(HttpRequest.user);
      return {
        body: themes,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      return {
        body: error.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
