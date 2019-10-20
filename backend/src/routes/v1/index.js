import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import sessionsRoute from './sessionsRoute';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(sessionsRoute);

export default routes;
