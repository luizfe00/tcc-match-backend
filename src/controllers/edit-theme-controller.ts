import { EditTheme } from '@/usecases/edit-theme';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { Theme } from '@/models/theme';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class EditThemeController implements Controller {
  constructor(private readonly useCase: EditTheme) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themePayload = { ...HttpRequest.body, id: HttpRequest.params.id } as Theme;
      await this.useCase.perform(themePayload, HttpRequest.token);
      return {
        body: {},
        statusCode: StatusCodes.UPDATED,
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
