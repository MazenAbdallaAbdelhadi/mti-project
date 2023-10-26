const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15d",
    algorithm: "HS256",
  });

exports.generateRefreshToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "60d",
    algorithm: "HS256",
  });

exports.setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true, //accessible only by web server
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days,
    origin: "https://localhost:4200",
  });
};
