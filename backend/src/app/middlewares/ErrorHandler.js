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
    if (process.env.ERROR_LOG === '1') {
      // eslint-disable-next-line no-console
      console.log('Error: ', error);
    }

    const { name, message, fields } = error;
    const status = error.statusCode || 500;

    if (name === 'ValidationError' && error.errors[0]) {
      const schemaErrors = error.inner.map(err => {
        return { field: err.path, message: err.message };
      });

      return res.status(400).json({
        name: 'Validation Error',
        message,
        fields: schemaErrors,
        status: 400,
      });
    }

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
