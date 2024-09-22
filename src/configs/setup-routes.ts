import { adaptValidator } from '@/adapters/express-validator-adapter';
import { makeGetSystemConfigController } from '@/factories/controllers/config/make-get-system-config-controller';
import { makeUpdateSystemConfigController } from '@/factories/controllers/config/make-update-system-config-controller';
import { makeGetSubjectsController } from '@/factories/controllers/dashboard/make-get-subjects-controller';
import { makeGetTeachersController } from '@/factories/controllers/dashboard/make-get-teachers-controller';
import { makeSendEmailController } from '@/factories/controllers/emailSender/make-send-email-controller';
import { makeApproveInterestController } from '@/factories/controllers/make-approve-interest-controller';
import { makeCreateApprovalController } from '@/factories/controllers/make-create-approval-controller';
import { makeCreateInterestController } from '@/factories/controllers/make-create-interest-controller';
import { makeCreateStageController } from '@/factories/controllers/make-create-stage-controller';
import { makeCreateThemeController } from '@/factories/controllers/make-create-theme-controller';
import { makeDeleteInterestController } from '@/factories/controllers/make-delete-interest-controller';
import { makeDeleteThemeController } from '@/factories/controllers/make-delete-theme-controller';
import { makeEditThemeController } from '@/factories/controllers/make-edit-theme-controller';
import { makeGetBIDataController } from '@/factories/controllers/make-get-bi-data-controller';
import { makeGetPaperController } from '@/factories/controllers/make-get-paper-controller';
import { makeGetProfessorBiDataController } from '@/factories/controllers/make-get-professor-bi-data-controller';
import { makeGetUserController } from '@/factories/controllers/make-get-user-controller';
import { makeListAllPapersController } from '@/factories/controllers/make-list-all-papers-controller';
import { makeListAllThemesController } from '@/factories/controllers/make-list-all-themes-controller';
import { makeListDeletedThemesController } from '@/factories/controllers/make-list-deleted-themes-controller';
import { makeListPaperStagesController } from '@/factories/controllers/make-list-paper-stages-controller';
import { makeListPendingApprovalsController } from '@/factories/controllers/make-list-pending-approvals-controller';
import { makeListPendingFeedbackController } from '@/factories/controllers/make-list-pending-feedback-controller';
import { makeListProfessorThemesController } from '@/factories/controllers/make-list-professor-themes-controller';
import { makeListStudentThemesController } from '@/factories/controllers/make-list-student-themes-controller';
import { makeListInterestController } from '@/factories/controllers/make-list-theme-interest-controller';
import { makeListUserInterestController } from '@/factories/controllers/make-list-user-interest-controller';
import { makeListUserPapersController } from '@/factories/controllers/make-list-user-papers-controller';
import { makeListUserThemesController } from '@/factories/controllers/make-list-user-themes-controller';
import { makeSignInController } from '@/factories/controllers/make-signin-controller';
import { makeUpdateApprovalController } from '@/factories/controllers/make-update-approval-controller';
import { makeUpdatePaperController } from '@/factories/controllers/make-update-paper-controller';
import { makeUpdateStageController } from '@/factories/controllers/make-update-stage-controller';
import { makeGetAllStudentsController } from '@/factories/controllers/students/make-get-all-students-controller';
import { makeApproveInterestValidator } from '@/factories/validators/make-approve-interest-validation';
import { makeCreateApprovalValidator } from '@/factories/validators/make-create-approval-validator';
import { makeCreateInterestValidator } from '@/factories/validators/make-create-interest-validator';
import { makeCreateStageValidator } from '@/factories/validators/make-create-stage-validator';
import { makeCreateThemeValidator } from '@/factories/validators/make-create-theme-validator';
import { makeUpdateApprovalValidator } from '@/factories/validators/make-update-approval-validator';
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
  listAllThemesRoute(router);
  listAllPapersRoute(router);
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
  getPaperDetailsRoute(router);
  getBIDataRoute(router);
  createApprovalRoute(router);
  updateApprovalRoute(router);
  updatePaperRoute(router);
  listDeletedThemesRoute(router);
  listPendingApprovalsRoute(router);
  getProfessorBiDataRoute(router);
  healthCheckRoute(router);
  getTeachersRoute(router);
  getSubjectsRoute(router);
  updateSystemConfigRoute(router);
  getSystemConfigRoute(router);
  sendEmailRoute(router);
  listAllStudentsRoute(router);
}

function healthCheckRoute(router: Router) {
  router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });
}

function createSignInRoute(router: Router) {
  router.post('/signin', adaptRoute(makeSignInController()));
}

function getUserRoute(router: Router) {
  router.get('/me', adaptRoute(makeGetUserController()));
}

function createThemeRoute(router: Router) {
  router.post(
    '/theme',
    adaptValidator(makeCreateThemeValidator()),
    adaptRoute(makeCreateThemeController())
  );
}

function editThemeRoute(router: Router) {
  router.put('/theme/:id', adaptRoute(makeEditThemeController()));
}

function deleteThemeRoute(router: Router) {
  router.delete('/theme/:id', adaptRoute(makeDeleteThemeController()));
}

function listStudenThemesRoute(router: Router) {
  router.get('/theme/student', adaptRoute(makeListStudentThemesController()));
}

function listUserThemesRoute(router: Router) {
  router.get('/theme', adaptRoute(makeListUserThemesController()));
}

function listProfessorThemesRoute(router: Router) {
  router.get('/theme/professor', adaptRoute(makeListProfessorThemesController()));
}

function createInterest(router: Router) {
  router.post(
    '/interest',
    adaptValidator(makeCreateInterestValidator()),
    adaptRoute(makeCreateInterestController())
  );
}

function deleteInterest(router: Router) {
  router.delete('/interest/:id', adaptRoute(makeDeleteInterestController()));
}

function listUserInterest(router: Router) {
  router.get('/interest', adaptRoute(makeListUserInterestController()));
}

function listThemeInterest(router: Router) {
  router.get('/interest/theme/:id', adaptRoute(makeListInterestController()));
}

function approveInterest(router: Router) {
  router.post(
    '/interest/approve',
    adaptValidator(makeApproveInterestValidator()),
    adaptRoute(makeApproveInterestController())
  );
}

function listUserPapersRoute(router: Router) {
  router.get('/paper', adaptRoute(makeListUserPapersController()));
}

function createStageRoute(router: Router) {
  router.post(
    '/stage',
    adaptValidator(makeCreateStageValidator()),
    adaptRoute(makeCreateStageController())
  );
}

function listPaperStagesRoute(router: Router) {
  router.get('/stage/paper/:id', adaptRoute(makeListPaperStagesController()));
}

function listPendingFeedbackRoute(router: Router) {
  router.get('/stage/pending', adaptRoute(makeListPendingFeedbackController()));
}

function updateStageRoute(router: Router) {
  router.put('/stage/:id', adaptRoute(makeUpdateStageController()));
}

function getPaperDetailsRoute(router: Router) {
  router.get('/paper/:id', adaptRoute(makeGetPaperController()));
}

function getBIDataRoute(router: Router) {
  router.get('/dashboard', adaptRoute(makeGetBIDataController()));
}

function createApprovalRoute(router: Router) {
  router.post(
    '/approval',
    adaptValidator(makeCreateApprovalValidator()),
    adaptRoute(makeCreateApprovalController())
  );
}

function updateApprovalRoute(router: Router) {
  router.put(
    '/approval/:id',
    adaptValidator(makeUpdateApprovalValidator()),
    adaptRoute(makeUpdateApprovalController())
  );
}

function listAllThemesRoute(router: Router) {
  router.get('/themes/all', adaptRoute(makeListAllThemesController()));
}

function listAllPapersRoute(router: Router) {
  router.get('/papers/all', adaptRoute(makeListAllPapersController()));
}

function updatePaperRoute(router: Router) {
  router.put('/paper/:id', adaptRoute(makeUpdatePaperController()));
}

function listDeletedThemesRoute(router: Router) {
  router.get('/themes/deleted', adaptRoute(makeListDeletedThemesController()));
}

function listPendingApprovalsRoute(router: Router) {
  router.get('/approval/pending', adaptRoute(makeListPendingApprovalsController()));
}

function getProfessorBiDataRoute(router: Router) {
  router.get('/dashboard/professor/:id', adaptRoute(makeGetProfessorBiDataController()));
}

function getTeachersRoute(router: Router) {
  router.get('/dashboard/teachers', adaptRoute(makeGetTeachersController()));
}

function getSubjectsRoute(router: Router) {
  router.get('/dashboard/subjects', adaptRoute(makeGetSubjectsController()));
}

function updateSystemConfigRoute(router: Router) {
  router.put('/config', adaptRoute(makeUpdateSystemConfigController()));
}

function getSystemConfigRoute(router: Router) {
  router.get('/config', adaptRoute(makeGetSystemConfigController()));
}

function sendEmailRoute(router: Router) {
  router.post('/email', adaptRoute(makeSendEmailController()));
}

function listAllStudentsRoute(router: Router) {
  router.get('/dashboard/students', adaptRoute(makeGetAllStudentsController()));
}
