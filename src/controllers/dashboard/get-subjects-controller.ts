import { GetSubjects } from '@/usecases/dashboard/get-subjects';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class GetSubjectsController implements Controller {
  constructor(private readonly useCase: GetSubjects) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { academicUnitCode } = HttpRequest.query as { academicUnitCode: string };
      const { user } = HttpRequest;
      const subjects = await this.useCase.perform(academicUnitCode, user);
      return {
        body: subjects,
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
