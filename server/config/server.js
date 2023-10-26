const { join } = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mountRoutes = require("../routes");
const errorHandler = require("../middleware/errorHandler.middleware");
const ApiError = require("../utils/ApiError");

const server = express();

// middlewares
server.use(cookieParser());
server.use(cors({ credentials: true, origin: "http://localhost:4200" }));
server.use(express.static(join(__dirname, "../uploads")));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// routes
mountRoutes(server);

server.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// error handlers
server.use(errorHandler);

module.exports = server;
