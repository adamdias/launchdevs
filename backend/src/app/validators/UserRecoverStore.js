import * as Yup from 'yup';
import SendError from '../services/SendError';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    req.body.email = req.body.email.toLowerCase();

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
