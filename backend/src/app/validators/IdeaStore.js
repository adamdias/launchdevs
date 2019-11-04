import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      category_id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      sub_title: Yup.string().required(),
      contact: Yup.string().required(),
      first_comment: Yup.string().required(),
      status: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return next(error);
  }
};
