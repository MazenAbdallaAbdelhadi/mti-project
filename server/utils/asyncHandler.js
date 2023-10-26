const ApiError = require("./ApiError");

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(new ApiError(err, 500));
  }
};

module.exports = asyncHandler;
