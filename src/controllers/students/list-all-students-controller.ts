import { ListAllStudents } from '@/usecases/sudents/list-all-students';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class ListAllStudentsController implements Controller {
  constructor(private readonly useCase: ListAllStudents) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const students = await this.useCase.perform(HttpRequest.user);
      return {
        body: students,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;

      if (BadRequestError) {
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
