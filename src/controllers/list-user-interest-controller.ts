import { ListUserInterest } from '@/usecases/list-user-interest';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListUserInterestController implements Controller {
  constructor(private readonly useCase: ListUserInterest) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const interests = await this.useCase.perform(HttpRequest.token);
      return {
        body: interests,
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
