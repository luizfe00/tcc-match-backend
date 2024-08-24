import { Express } from 'express';
import { bodyParser, contentType, cors, authMiddleware } from '@/middlewares';

export function setupMiddleware(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
  app.use(authMiddleware);
}
