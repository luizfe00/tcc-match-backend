import { ListAllStudentThemes } from '@/usecases/list-all-student-themes';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListStudentThemesController implements Controller {
  constructor(private readonly useCase: ListAllStudentThemes) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themes = await this.useCase.perform();
      return {
        body: themes,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error,
      };
    }
  }
}
