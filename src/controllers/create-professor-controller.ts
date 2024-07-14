import { UseCase } from '@/usecases/ports/use-case';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class CreateProfessorController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const student = await this.useCase.perform(request.body, request.token);
      return {
        body: student,
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
