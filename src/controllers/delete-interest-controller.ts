import { DeleteInterest } from '@/usecases/delete-interest';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class DeleteInterestController implements Controller {
  constructor(private readonly useCase: DeleteInterest) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.useCase.perform(HttpRequest.params.id, HttpRequest.user);
      return {
        body: {},
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const NotFoundError = error.constructor.name === RequestErrorNames.NOT_FOUND;

      if (NotFoundError || BadRequestError) {
        return {
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
          statusCode: error.httpStatus,
        };
      }

      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error,
      };
    }
  }
}
