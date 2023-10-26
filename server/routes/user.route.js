/**
 * @desc handle the categories operations
 * @route api/v1/categories
 */
const { Router } = require("express");

const UserController = require("../controller/user.controller");
const requireAuth = require("../middleware/requireAuth.middleware");
const requireRole = require("../middleware/requireRole.middleware");

const router = Router();

router
  .route("/")
  .post(
    requireAuth,
    requireRole("admin"),
    UserController.uploadUserImage,
    UserController.resizeImage,
    UserController.createOne
  )
  .get(requireAuth, requireRole("admin"), UserController.getAll);

router
  .route("/:id")
  .get(requireAuth, requireRole("admin"), UserController.getById)
  .put(
    requireAuth,
    requireRole("admin"),
    UserController.uploadUserImage,
    UserController.resizeImage,
    UserController.updateById
  )
  .delete(requireAuth, requireRole("admin"), UserController.deleteById);

module.exports = router;
