import crypto from 'crypto';

import User from '../models/User';
import SendError from '../services/SendError';
import Queue from '../../lib/Queue';
import ConfirmMail from '../jobs/ConfirmMail';
import UserExists from '../services/UserExists';

class UserController {
  async store(req, res, next) {
    try {
      const { email, nickname } = req.body;

      await UserExists(email, nickname);

      const token = crypto.randomBytes(3).toString('hex');

      req.body.confirm_email = false;
      req.body.confirm_email_token = token.toLocaleUpperCase();

      const user = await User.create(req.body);

      await Queue.add(ConfirmMail.key, {
        user: {
          name: user.first_name,
          email: user.email,
        },
        link: `${process.env.APP_URL}/v1/users/confirm/${token}`,
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } catch (error) {
      return next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { nickname } = req.params;

      const user = await User.findOne({
        where: { nickname },
        attributes: [
          'id',
          'first_name',
          'last_name',
          'email',
          'nickname',
          'bio',
          'github',
          'linkedin',
          'objective',
        ],
      });

      if (!user) {
        throw new SendError('Not Found', 'User not found!', 404);
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
