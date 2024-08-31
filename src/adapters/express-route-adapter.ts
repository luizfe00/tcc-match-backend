import { HttpRequest, Controller } from '@controllers/ports';
import { Request, Response } from 'express';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      user: req.user,
      body: req.body,
      params: req.params,
      query: req.query,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
