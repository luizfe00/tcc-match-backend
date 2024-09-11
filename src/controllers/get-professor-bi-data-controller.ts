import { Request, Response } from 'express';
import { Controller, HttpRequest, HttpResponse } from './ports';
import { GetProfessorBIData } from '@/usecases/get-professor-bi-data';
import { StatusCodes } from '@/constants/SatusCode';
import { RequestErrorNames } from '@/constants/Errors';

export class GetProfessorBIDataController implements Controller {
  constructor(private readonly useCase: GetProfessorBIData) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id: professorId } = HttpRequest.params;
      const { startDate, endDate } = HttpRequest.query as { startDate: string; endDate: string };
      const data = await this.useCase.perform(
        { professorId, startDate, endDate },
        HttpRequest.user
      );
      return {
        statusCode: StatusCodes.OK,
        body: data,
      };
    } catch (error) {
      const badRequest = error.constructor.name === RequestErrorNames.BAD_REQUEST;
      if (badRequest) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: error.message,
      };
    }
  }
}
