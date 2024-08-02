import { GetUser } from '@/usecases/get-user';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class GetUserController implements Controller {
  constructor(private readonly useCase: GetUser) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.useCase.perform(HttpRequest.token);
      return {
        body: user,
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
