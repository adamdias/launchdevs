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
<<<<<<< HEAD
        // attributes: [
        //   'id',
        //   'first_name',
        //   'last_name',
        //   'email',
        //   'nickname',
        //   'bio',
        //   'github',
        //   'linkedin',
        // ],
=======
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
>>>>>>> ab460e98b4dbddbf7897fe7709340cad7e911802
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
