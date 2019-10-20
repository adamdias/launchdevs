import { resolve } from 'path';
import * as fs from 'fs';

import File from '../models/File';
import SendError from '../services/SendError';
import User from '../models/User';
import RemoveFile from '../services/RemoveFile';
import CompressFile from '../services/CompressFile';

class FileUserController {
  async store(req, res, next) {
    try {
      const { originalname: name, filename, path } = req.file;

      if (!name || !filename) {
        throw new SendError(
          'Validations Fails',
          'You made an invalid request',
          400
        );
      }

      const user = await User.findOne({
        where: {
          id: req.userId,
        },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'url', 'path'],
          },
        ],
      });

      const newPath = await CompressFile(path, filename);

      if (!user) {
        await RemoveFile(newPath);
        throw new SendError('Not Found', 'User not found', 404);
      }

      const file = await File.create({
        name,
        path: newPath,
      });

      if (user.avatar_id) {
        const dir = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          user.avatar.path
        );

        const fileExists = await fs.existsSync(dir);

        if (fileExists) {
          await fs.unlinkSync(dir);
        }

        await File.destroy({ where: { id: user.avatar_id } });
      }

      await user.update({ avatar_id: file.id });

      return res.json(file);
    } catch (error) {
      return next(error);
    }
  }
}

export default new FileUserController();
