import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import SessionController from '../../app/controllers/SessionController';
import validateSessionStore from '../../app/validators/SessionStore';

const routes = Router();

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  const bruteForce = new Brute(bruteStore);

  routes.post(
    '/sessions',
    bruteForce.prevent,
    validateSessionStore,
    SessionController.store
  );
} else {
  routes.post('/sessions', validateSessionStore, SessionController.store);
}

export default routes;
