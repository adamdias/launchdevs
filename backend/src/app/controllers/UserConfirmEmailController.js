import crypto from 'crypto';

import Queue from '../../lib/Queue';
import ConfirmationResponseMail from '../jobs/ConfirmationResponseMail';
import SendError from '../services/SendError';

import User from '../models/User';

class UserConfirmEmailController {
  async store(req, res, next) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        throw new SendError('Not Found', 'Not found user!', 404);
      }

      if (user.confirm_email) {
        throw new SendError(
          'Unauthorized',
          'Have you confirmed your email!',
          401
        );
      }

      const token = crypto.randomBytes(3).toString('hex');

      await user.update({
        confirm_email_token: token.toLocaleUpperCase(),
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { token } = req.body;

      const user = await User.findOne({
        where: {
          confirm_email_token: token.toLocaleUpperCase(),
        },
      });

      if (!user) {
        throw new SendError('Not Found', 'Not found user!', 404);
      }

      const { name, email } = await user.update({
        confirm_email: true,
        confirm_email_token: null,
      });

      await Queue.add(ConfirmationResponseMail.key, {
        name,
        email,
      });

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserConfirmEmailController();
