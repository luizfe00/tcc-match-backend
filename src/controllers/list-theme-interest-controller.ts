import { ListThemeInterests } from '@/usecases/list-theme-interest';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class ListThemeInterestsController implements Controller {
  constructor(private readonly useCase: ListThemeInterests) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const interests = await this.useCase.perform(HttpRequest.params.id, HttpRequest.token);
      return {
        body: interests,
        statusCode: StatusCodes.OK,
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
