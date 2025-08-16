const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "Forbidden",
        message: `Role ${req.user.role} is not authorized to access this resource`,
      });
    }
    next();
  };
};

module.exports = authorizedRoles;
