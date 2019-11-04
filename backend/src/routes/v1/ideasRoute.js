import { Router } from 'express';

import AuthMiddleware from '../../app/middlewares/Auth';

import IdeaController from '../../app/controllers/IdeaController';
import ValidationIdeaStore from '../../app/validators/IdeaStore';

const routes = Router();

routes.post(
  '/ideas',
  AuthMiddleware,
  ValidationIdeaStore,
  IdeaController.store
);

export default routes;
