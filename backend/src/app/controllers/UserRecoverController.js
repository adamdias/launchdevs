import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import Queue from '../../lib/Queue';
import RecoverMail from '../jobs/RecoverMail';
import authConfig from '../../config/auth';
import SendError from '../services/SendError';
import RecoverSuccessMail from '../jobs/RecoverSuccessMail';

class UserRecoverController {
  async store(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(204).json();
      }

      const token = await jwt.sign({ email }, authConfig.secret, {
        expiresIn: '1h',
      });

      const { recover_pass_token } = await user.update({
        recover_pass_token: token,
      });

      await Queue.add(RecoverMail.key, {
        user: {
          name: user.name,
          email: user.email,
          recover_pass_token,
        },
        link: `${process.env.WEB_URL}/recover?tk=${token}`,
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const decoded = await promisify(jwt.verify)(
        token,
        authConfig.secret
      ).catch(() => {
        throw new SendError(
          'Invalid token.',
          'The token has expired or is not valid.',
          401
        );
      });

      const user = await User.findOne({
        where: {
          email: decoded.email,
          recover_pass_token: token,
        },
      });

      if (!user) {
        throw new SendError('Not Found', 'User not found!', 404);
      }

      const { id, nickname, name } = await user.update({
        recover_pass_token: null,
        password,
      });

      await Queue.add(RecoverSuccessMail.key, {
        user: {
          name: user.name,
          email: user.email,
        },
      });

      return res.json({ id, nickname, name });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserRecoverController();
