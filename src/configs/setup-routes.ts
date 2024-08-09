import { adaptValidator } from '@/adapters/express-validator-adapter';
import { makeApproveInterestController } from '@/factories/controllers/make-approve-interest-controller';
import { makeCreateInterestController } from '@/factories/controllers/make-create-interest-controller';
import { makeCreateStageController } from '@/factories/controllers/make-create-stage-controller';
import { makeCreateThemeController } from '@/factories/controllers/make-create-theme-controller';
import { makeDeleteInterestController } from '@/factories/controllers/make-delete-interest-controller';
import { makeDeleteThemeController } from '@/factories/controllers/make-delete-theme-controller';
import { makeEditThemeController } from '@/factories/controllers/make-edit-theme-controller';
import { makeGetUserController } from '@/factories/controllers/make-get-user-controller';
import { makeListPaperStagesController } from '@/factories/controllers/make-list-paper-stages-controller';
import { makeListPendingFeedbackController } from '@/factories/controllers/make-list-pending-feedback-controller';
import { makeListProfessorThemesController } from '@/factories/controllers/make-list-professor-themes-controller';
import { makeListStudentThemesController } from '@/factories/controllers/make-list-student-themes-controller';
import { makeListInterestController } from '@/factories/controllers/make-list-theme-interest-controller';
import { makeListUserInterestController } from '@/factories/controllers/make-list-user-interest-controller';
import { makeListUserPapersController } from '@/factories/controllers/make-list-user-papers-controller';
import { makeListUserThemesController } from '@/factories/controllers/make-list-user-themes-controller';
import { makeSignInController } from '@/factories/controllers/make-signin-controller';
import { makeUpdateStageController } from '@/factories/controllers/make-update-stage-controller';
import { createAuthenticationValidator } from '@/factories/validators/create-authentication-validator';
import { makeApproveInterestValidator } from '@/factories/validators/make-approve-interest-validation';
import { makeCreateInterestValidator } from '@/factories/validators/make-create-interest-validator';
import { makeCreateStageValidator } from '@/factories/validators/make-create-stage-validator';
import { makeCreateThemeValidator } from '@/factories/validators/make-create-theme-validator';
import { adaptRoute } from '@adapters/express-route-adapter';
import { Router, Express } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);

  createSignInRoute(router);
  getUserRoute(router);
  createThemeRoute(router);
  editThemeRoute(router);
  deleteThemeRoute(router);
  listStudenThemesRoute(router);
  listProfessorThemesRoute(router);
  createInterest(router);
  deleteInterest(router);
  listUserInterest(router);
  listThemeInterest(router);
  approveInterest(router);
  listUserThemesRoute(router);
  listUserPapersRoute(router);
  createStageRoute(router);
  listPaperStagesRoute(router);
  listPendingFeedbackRoute(router);
  updateStageRoute(router);
}

function createSignInRoute(router: Router) {
  router.post('/signin', adaptRoute(makeSignInController()));
}

function getUserRoute(router: Router) {
  router.get(
    '/me',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeGetUserController())
  );
}

function createThemeRoute(router: Router) {
  router.post(
    '/theme',
    adaptValidator(createAuthenticationValidator()),
    adaptValidator(makeCreateThemeValidator()),
    adaptRoute(makeCreateThemeController())
  );
}

function editThemeRoute(router: Router) {
  router.put(
    '/theme/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeEditThemeController())
  );
}

function deleteThemeRoute(router: Router) {
  router.delete(
    '/theme/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeDeleteThemeController())
  );
}

function listStudenThemesRoute(router: Router) {
  router.get(
    '/theme/student',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListStudentThemesController())
  );
}

function listUserThemesRoute(router: Router) {
  router.get(
    '/theme',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListUserThemesController())
  );
}

function listProfessorThemesRoute(router: Router) {
  router.get(
    '/theme/professor',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListProfessorThemesController())
  );
}

function createInterest(router: Router) {
  router.post(
    '/interest',
    adaptValidator(createAuthenticationValidator()),
    adaptValidator(makeCreateInterestValidator()),
    adaptRoute(makeCreateInterestController())
  );
}

function deleteInterest(router: Router) {
  router.delete(
    '/interest/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeDeleteInterestController())
  );
}

function listUserInterest(router: Router) {
  router.get(
    '/interest',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListUserInterestController())
  );
}

function listThemeInterest(router: Router) {
  router.get(
    '/interest/theme/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListInterestController())
  );
}

function approveInterest(router: Router) {
  router.post(
    '/interest/approve',
    adaptValidator(createAuthenticationValidator()),
    adaptValidator(makeApproveInterestValidator()),
    adaptRoute(makeApproveInterestController())
  );
}

function listUserPapersRoute(router: Router) {
  router.get(
    '/paper',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListUserPapersController())
  );
}

function createStageRoute(router: Router) {
  router.post(
    '/stage',
    adaptValidator(createAuthenticationValidator()),
    adaptValidator(makeCreateStageValidator()),
    adaptRoute(makeCreateStageController())
  );
}

function listPaperStagesRoute(router: Router) {
  router.get(
    '/stage/paper/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListPaperStagesController())
  );
}

function listPendingFeedbackRoute(router: Router) {
  router.get(
    '/stage/pending',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeListPendingFeedbackController())
  );
}

function updateStageRoute(router: Router) {
  router.put(
    '/stage/:id',
    adaptValidator(createAuthenticationValidator()),
    adaptRoute(makeUpdateStageController())
  );
}
