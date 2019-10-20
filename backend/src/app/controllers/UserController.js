import crypto from 'crypto';

import User from '../models/User';
import SendError from '../services/SendError';
import Queue from '../../lib/Queue';
import ConfirmMail from '../jobs/ConfirmMail';

class UserController {
  async store(req, res, next) {
    try {
      const { email, nickname } = req.body;

      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists) {
        throw new SendError(
          'Unauthorized',
          'Email already exists in another user',
          401
        );
      }

      const nicknameExists = await User.findOne({
        where: { nickname },
      });

      if (nicknameExists) {
        throw new SendError(
          'Unauthorized',
          'Nickname already exists in another user',
          401
        );
      }

      const token = crypto.randomBytes(3).toString('hex');

      req.body.confirm_email = false;
      req.body.confirm_email_token = token.toLocaleUpperCase();

      const user = await User.create(req.body);

      // if (process.env.NODE_ENV !== 'test') {
      await Queue.add(ConfirmMail.key, {
        user: {
          name: user.name,
          email: user.email,
        },
        link: `${process.env.APP_URL}/v1/users/confirm/${token}`,
      });
      // }

      return res.status(201).json({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        name: user.name,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
