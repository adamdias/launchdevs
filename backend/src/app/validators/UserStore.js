import * as Yup from 'yup';
import SendError from '../services/SendError';
import ConvertToSlug from '../services/ConvertToSlug';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      nickname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    if (/^[0-9]+$/.test(req.body.nickname)) {
      throw new SendError(
        'Validation Error',
        'Nickname cannot be a number',
        400
      );
    }

    req.body.email = req.body.email.toLowerCase();
    req.body.nickname = ConvertToSlug(req.body.nickname);

    return next();
  } catch (error) {
    if (error.name === 'ValidationError' && error.errors[0]) {
      const schemaErrors = error.inner.map(err => {
        return { field: err.path, message: err.message };
      });

      const validationError = new SendError(
        'Validation Error',
        'One or more fields is not valid.',
        400,
        schemaErrors
      );

      return next(validationError);
    }

    return next(error);
  }
};
