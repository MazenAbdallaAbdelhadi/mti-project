const categoriesRoute = require("./categories.route");
const usersRoute = require("./user.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const reviewRoute = require("./review.route");
const orderRoute = require("./order.route");

const mountRoutes = (server) => {
  server.use("/api/v1/categories", categoriesRoute);
  server.use("/api/v1/users", usersRoute);
  server.use("/api/v1/auth", authRoute);
  server.use("/api/v1/products", productRoute);
  server.use("/api/v1/review", reviewRoute);
  server.use("/api/v1/orders", orderRoute);
};

module.exports = mountRoutes;
