import { adaptValidator } from '@/adapters/express-validator-adapter';
import { makeCreateProfessorController } from '@/factories/controllers/make-create-professor-controller';
import { makeCreateStudentController } from '@/factories/controllers/make-create-student-controller';
import { createCreateStudentValidator } from '@/factories/validators/create-student-validator';
import { adaptRoute } from '@adapters/express-route-adapter';
import { Router, Express } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);

  createCreateStudentRoute(router);
  createCreateProfessorRoute(router);
}

function createCreateStudentRoute(router: Router) {
  router.post(
    '/student',
    adaptValidator(createCreateStudentValidator()),
    adaptRoute(makeCreateStudentController())
  );
}

function createCreateProfessorRoute(router: Router) {
  router.post('/professor', adaptRoute(makeCreateProfessorController()));
}
