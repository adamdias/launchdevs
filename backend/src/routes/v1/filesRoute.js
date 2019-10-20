import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';
import AuthMiddleware from '../../app/middlewares/Auth';

import FileUserController from '../../app/controllers/FileUserController';

const routes = Router();

routes.post(
  '/files/users',
  AuthMiddleware,
  multer(multerConfig()).single('file'),
  FileUserController.store
);

export default routes;
