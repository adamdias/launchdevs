import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import SendError from '../app/services/SendError';

export default (
  maxSize = 15,
  mimes = ['image/jpeg', 'image/pjpeg', 'image/png']
) => {
  return {
    limits: {
      fileSize: maxSize * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (mimes.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(
        new SendError(
          'Extension not allowed',
          'Only .jpg and .png file allowed',
          400
        )
      );
    },
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);

          return cb(null, res.toString('hex') + extname(file.originalname));
        });
      },
    }),
  };
};
