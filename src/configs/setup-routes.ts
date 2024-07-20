import { adaptValidator } from '@/adapters/express-validator-adapter';
import { makeCreateThemeController } from '@/factories/controllers/make-create-theme-controller';
import { makeSignInController } from '@/factories/controllers/make-signin-controller';
import { createAuthenticationValidator } from '@/factories/validators/create-authentication-validator';
import { makeCreateThemeValidator } from '@/factories/validators/make-create-theme-validator';
import { adaptRoute } from '@adapters/express-route-adapter';
import { Router, Express } from 'express';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);

  createSignInRoute(router);
  createThemeRoute(router);
}

function createSignInRoute(router: Router) {
  router.post('/signin', adaptRoute(makeSignInController()));
}

function createThemeRoute(router: Router) {
  router.post(
    '/theme',
    adaptValidator(createAuthenticationValidator()),
    adaptValidator(makeCreateThemeValidator()),
    adaptRoute(makeCreateThemeController())
  );
}
