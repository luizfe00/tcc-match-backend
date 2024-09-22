import { RequestErrorNames } from '@/constants/Errors';
import { StatusCodes } from '@/constants/SatusCode';
import { Controller, HttpRequest, HttpResponse } from '@/controllers/ports';
import { GetTeachers } from '@/usecases/dashboard/get-teachers';

export class GetTeachersController implements Controller {
  constructor(private readonly useCase: GetTeachers) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { academicUnitCode } = HttpRequest.query as { academicUnitCode: string };
      const { user } = HttpRequest;
      const teachers = await this.useCase.perform(academicUnitCode, user);
      return {
        body: teachers,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      const NotFoundError = error.constructor.name === RequestErrorNames.NOT_FOUND;
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const ExistingEntityError = error.constructor.name === RequestErrorNames.EXISTING_ENTITY;

      if (NotFoundError || BadRequestError || ExistingEntityError) {
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
