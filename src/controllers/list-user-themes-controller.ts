import { ListUserThemes } from '@/usecases/list-user-themes';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListUserThemesController implements Controller {
  constructor(private readonly useCase: ListUserThemes) {}

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
