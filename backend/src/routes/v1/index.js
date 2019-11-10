import { Router } from 'express';

import filesRoute from './filesRoute';
import usersRoute from './usersRoute';
import sessionsRoute from './sessionsRoute';
import ideasRoute from './ideasRoute';

const routes = Router();

routes.use(filesRoute);

routes.use(usersRoute);

routes.use(sessionsRoute);

routes.use(ideasRoute);

export default routes;
