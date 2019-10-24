import * as Yup from 'yup';

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
    return next(error);
  }
};
