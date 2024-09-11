import { UpdatePaper } from '@/usecases/update-paper';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';

export class UpdatePaperController implements Controller {
  constructor(private readonly useCase: UpdatePaper) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = {
        id: HttpRequest.params.id,
        ...HttpRequest.body,
      };
      await this.useCase.perform(payload, HttpRequest.user);
      return {
        body: undefined,
        statusCode: StatusCodes.UPDATED,
      };
    } catch (error) {
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const NotFoundError = error.constructor.name === RequestErrorNames.NOT_FOUND;

      if (BadRequestError || NotFoundError) {
        return {
          statusCode: error.httpStatus,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }

      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error,
      };
    }
  }
}
