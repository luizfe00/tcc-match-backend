import { ListUserPapers } from '@/usecases/list-user-papers';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListUserPapersController implements Controller {
  constructor(private readonly useCase: ListUserPapers) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const papers = await this.useCase.perform(HttpRequest.user);
      return {
        body: papers,
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
