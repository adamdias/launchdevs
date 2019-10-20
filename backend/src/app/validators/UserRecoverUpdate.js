import * as Yup from 'yup';
import SendError from '../services/SendError';

export default async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Yup.object().shape({
      password: Yup.string()
        .min(6)
        .required(),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    await schema.validate(req.body, { abortEarly: false });

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
