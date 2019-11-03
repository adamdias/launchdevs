import { Router } from 'express';

import AuthMiddleware from '../../app/middlewares/Auth';

import IdeaController from '../../app/controllers/IdeaController';

const routes = Router();

routes.post('/ideas', AuthMiddleware, IdeaController.store);

export default routes;
