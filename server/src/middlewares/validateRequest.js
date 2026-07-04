export const validateFields = (fields = []) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || String(value).trim() === '';
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    next();
  };
};

export const protectAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_KEY is missing on server.',
    });
  }

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized admin request.',
    });
  }

  next();
};