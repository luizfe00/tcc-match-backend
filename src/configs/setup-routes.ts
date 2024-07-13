import { makeCreateStudentController } from '@/factories/controllers/make-create-student-controller';
import { adaptRoute } from '@adapters/express-route-adapter';
import { Router, Express } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  createCreateStudentRoute(router);
}

function createCreateStudentRoute(router: Router) {
  router.post('/student', adaptRoute(makeCreateStudentController()));
}
