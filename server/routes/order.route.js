/**
 * @desc handle the order operations
 * @route api/v1/orders
 */
const { Router } = require("express");

const OrderController = require("../controller/order.controller");
const requireAuth = require("../middleware/requireAuth.middleware");
const requireRole = require("../middleware/requireRole.middleware");

const router = Router();

router
  .route("/")
  .post(requireAuth, OrderController.createOne)
  .get(requireAuth, requireRole("admin"), OrderController.getAll);
router
  .route("/:id")
  .get(requireAuth, OrderController.getById)
  .put(requireAuth, OrderController.updateById)
  .delete(requireAuth, OrderController.deleteById);

module.exports = router;
