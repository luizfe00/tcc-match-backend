import { HttpRequest, Controller } from '@controllers/ports';
import { Request, Response } from 'express';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const formatedToken = req.headers.authorization?.split('Bearer ')?.[1];
    const httpRequest: HttpRequest = {
      token: formatedToken,
      body: req.body,
      params: req.params,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
