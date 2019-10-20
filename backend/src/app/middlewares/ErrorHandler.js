import SendError from '../services/SendError';

class ErrorHandler {
  catchNotFound(req, res, next) {
    const error = new SendError(
      'Not Found.',
      'The route you are trying to reach was not found',
      404
    );

    next(error);
  }

  catchErrors(error, req, res, next) {
    // eslint-disable-next-line no-console
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      // console.log('Error: ', error);
    }

    const { name, message, fields } = error;
    const status = error.statusCode || 500;

    return res.status(status).json({
      name: status === 500 ? 'Internal error.' : name,
      message:
        status === 500 ? 'Ooops, looks like we have a problem.' : message,
      fields,
      status,
    });
  }
}

export default new ErrorHandler();
