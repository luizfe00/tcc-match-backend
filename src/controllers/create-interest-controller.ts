import { CreateInterest } from '@/usecases/create-interest';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { Interest } from '@/models/interest';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class CreateInterestController implements Controller {
  constructor(private readonly useCase: CreateInterest) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const interestPayload = HttpRequest.body as Interest;
      const interest = await this.useCase.perform(interestPayload, HttpRequest?.token);
      return {
        body: interest,
        statusCode: StatusCodes.CREATED,
      };
    } catch (error) {
      console.log(error);
      const BadRequestError = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      const ExistingEntityError = error.constructor.name === RequestErrorNames.EXISTING_ENTITY;

      if (BadRequestError || ExistingEntityError) {
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
