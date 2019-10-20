import { Router } from 'express';

import UserController from '../../app/controllers/UserController';
import UserRecoverController from '../../app/controllers/UserRecoverController';
import UserConfirmEmailController from '../../app/controllers/UserConfirmEmailController';
import validateUserStore from '../../app/validators/UserStore';
import validateUserRecoverStore from '../../app/validators/UserRecoverStore';
import validateUserRecoverUpdate from '../../app/validators/UserRecoverUpdate';

import AuthMiddleware from '../../app/middlewares/Auth';

const routes = Router();

routes.post('/users', validateUserStore, UserController.store);

routes.get('/users/nickname/:nickname', UserController.show);

routes.post(
  '/users/recover',
  validateUserRecoverStore,
  UserRecoverController.store
);

routes.put(
  '/users/recover/:token',
  validateUserRecoverUpdate,
  UserRecoverController.update
);

routes.put('/users/confirmemail', UserConfirmEmailController.update);
routes.post(
  '/users/confirmemail',
  AuthMiddleware,
  UserConfirmEmailController.store
);

export default routes;
