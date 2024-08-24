import { GetBIData } from '@/usecases/get-bi-data';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class GetBIDataController implements Controller {
  constructor(private readonly useCase: GetBIData) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = await this.useCase.perform(HttpRequest.user);
      return {
        body: data,
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
