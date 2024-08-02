import { ListProfessorThemes } from '@/usecases/list-professor-themes';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListProfessorThemesController implements Controller {
  constructor(private readonly useCase: ListProfessorThemes) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themes = await this.useCase.perform();
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
