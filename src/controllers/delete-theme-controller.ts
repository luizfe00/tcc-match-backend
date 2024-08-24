import { DeleteTheme } from '@/usecases/delete-theme';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class DeleteThemeController implements Controller {
  constructor(private readonly useCase: DeleteTheme) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = HttpRequest.params.id as string;
      await this.useCase.perform(id, HttpRequest.user);
      return {
        body: {},
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const entityNotFound = error.constructor.name === RequestErrorNames.NOT_FOUND;
      const badRequest = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (entityNotFound || badRequest) {
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
