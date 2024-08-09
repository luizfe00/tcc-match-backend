import { ListPendingFeedback } from '@/usecases/list-pending-feedback';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';

export class ListPendingFeedbackController implements Controller {
  constructor(private readonly useCase: ListPendingFeedback) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stages = await this.useCase.perform(HttpRequest.token);
      return {
        body: stages,
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
