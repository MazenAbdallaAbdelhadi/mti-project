const joi = require("joi");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} = require("../utils/generateToken");

class AuthController {
  static #baseUserSchema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi
      .string()
      .required("confirm password is required")
      .valid(joi.ref("password")),
  };

  static loginValidator = asyncHandler(async (req, res, next) => {
    const userLoginSchema = joi.object({
      email: this.#baseUserSchema.email,
      password: this.#baseUserSchema.password,
    });

    const { error } = userLoginSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });

    if (error) {
      next(
        new ApiError(
          error.details.map((err) => err.message),
          400
        )
      );
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // unAthorized
      next(new ApiError("Incorrect email or password", 401));
    }

    const result = await user.comparePassword(req.body.password);

    if (!result) {
      // unAthorized
      next(new ApiError("Incorrect email or password", 401));
    }

    req.user = user;
    next();
  });

  static login = asyncHandler(async (req, res, next) => {
    const { user } = req;

    // if the was not active make him active again
    if (user.active === false) {
      user.active = true;
      await user.save();
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json(
      new ApiResponse(
        "login success",
        {
          user,
          token: accessToken,
        },
        "OK"
      )
    );
  });

  static registerValidator = asyncHandler(async (req, res, next) => {
    // Validate the request body
    const { error, value } = joi
      .object(this.#baseUserSchema)
      .validate(req.body, {
        errors: { label: "key", wrap: { label: false } },
      });

    if (error) {
      next(
        new ApiError(
          error.details.map((err) => err.message),
          400
        )
      );
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: value.email });
    if (userExists) {
      next(new ApiError("email already exists", 400));
    }

    next();
  });

  static register = asyncHandler(async (req, res, next) => {
    // Create user
    const user = await User.create(req.body);

    // Generate token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);

    res
      .status(201)
      .json(new ApiResponse("welcome", { user, token: accessToken }, "OK"));
  });

  static refreshValidator = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      next(new ApiError("Refresh token not found", 401));
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      { algorithms: ["HS256"] }
    );

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      next(new ApiError("User not found", 401));
    }

    req.user = user;
    next();
  });

  static refresh(req, res, next) {
    const accessToken = generateAccessToken(req.user);

    res.json(
      new ApiResponse("new token generated", { token: accessToken }, "OK")
    );
  }

  static logoutValidator(req, res, next) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      next(new ApiError("No Content", 204));
    }

    next();
  }

  static logout(req, res, next) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json(new ApiResponse("logout", { success: true }, "OK"));
  }
}

module.exports = AuthController;
