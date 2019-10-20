import { Router } from 'express';

import UserController from '../../app/controllers/UserController';
import validateUserStore from '../../app/validators/UserStore';
import validateUserRecoverStore from '../../app/validators/UserRecoverStore';
import validateUserRecoverUpdate from '../../app/validators/UserRecoverUpdate';
import UserRecoverController from '../../app/controllers/UserRecoverController';
import UserConfirmEmailController from '../../app/controllers/UserConfirmEmailController';

const routes = Router();

routes.post('/users', validateUserStore, UserController.store);

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

routes.get('/users/confirm/:token', UserConfirmEmailController.update);

export default routes;
