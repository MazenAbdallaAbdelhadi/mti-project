const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; //server error

  res.status(statusCode);

  if (process.env.NODE_ENV === "development") {
    return res.json(new ApiResponse(err.message, err.stack, "error"));
  }
  return res.json(new ApiResponse(err.message, null, "error"));
};

module.exports = errorHandler;
