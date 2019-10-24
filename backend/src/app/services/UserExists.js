import User from '../models/User';
import SendError from './SendError';

export default async (email, nickname) => {
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
};
