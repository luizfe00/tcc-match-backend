import { Express } from 'express';
import { bodyParser, contentType, authMiddleware } from '@/middlewares';
import cors from 'cors'

export function setupMiddleware(app: Express): void {
  app.use(cors({ origin: '*' }));
  app.use(bodyParser);
  app.use(contentType);
  app.use(authMiddleware);
}
