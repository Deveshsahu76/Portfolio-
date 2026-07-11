export const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  })
}

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  let statusCode =
    Number(error.status || error.statusCode) || 500

  let message =
    error.message || 'Internal server error.'

  if (error.type === 'entity.too.large') {
    statusCode = 413
    message = 'Uploaded data is too large.'
  }

  if (error instanceof SyntaxError && error.status === 400) {
    statusCode = 400
    message = 'Invalid JSON request body.'
  }

  if (message === 'Origin not allowed by CORS.') {
    statusCode = 403
  }

  console.error('API error:', {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message,
  })

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Internal server error.'
        : message,

    ...(process.env.NODE_ENV !== 'production' && {
      error: error.stack,
    }),
  })
}