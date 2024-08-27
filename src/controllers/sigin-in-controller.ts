import { UseCase } from '@/usecases/ports/use-case';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { RequestErrorNames } from '@/constants/Errors';

export class SignInController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const entity = await this.useCase.perform(HttpRequest.body);
      return {
        body: entity,
        statusCode: 200,
      };
    } catch (error) {
      console.log('error', error);
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
        body: {
          errorType: error.code,
          message: error.response.data.message,
        },
        statusCode: error.response.status,
      };
    }
  }
}
