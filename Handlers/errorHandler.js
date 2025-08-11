const errorHandler = (next, error, req, res) => {
  if (error) {
    if (error.message) {
      res.status(400).json({
        status: "Failed",
        message: error.message,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  }
  next();
};

module.exports = errorHandler;
