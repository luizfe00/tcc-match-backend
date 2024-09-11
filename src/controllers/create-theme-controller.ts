import { Controller, HttpRequest, HttpResponse } from './ports';
import { CreateTheme } from '@/usecases/create-theme';
import { ThemePayload } from '@/models/theme';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class CreateThemeController implements Controller {
  constructor(private readonly useCase: CreateTheme) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const themePayload = HttpRequest.body as ThemePayload;
      const theme = await this.useCase.perform(themePayload, HttpRequest.user);
      return {
        body: theme,
        statusCode: StatusCodes.CREATED,
      };
    } catch (error) {
      const entityNonExistent = error.constructor.name === RequestErrorNames.EXISTING_ENTITY;
      const userUnauthorized = error.constructor.name === RequestErrorNames.UNAUTHORIZED;

      if (entityNonExistent || userUnauthorized) {
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
