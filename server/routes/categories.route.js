/**
 * @desc handle the categories operations
 * @route api/v1/categories
 */
const { Router } = require("express");

const CategoryController = require("../controller/category.controller");
const requireAuth = require("../middleware/requireAuth.middleware");
const requireRole = require("../middleware/requireRole.middleware");

const router = Router();

router
  .route("/")
  .post(
    requireAuth,
    requireRole("admin"),
    CategoryController.uploadCategoryImage,
    CategoryController.resizeImage,
    CategoryController.createOne
  )
  .get(CategoryController.getAll);
router
  .route("/:id")
  .get(CategoryController.getById)
  .put(
    requireAuth,
    requireRole("admin"),
    CategoryController.uploadCategoryImage,
    CategoryController.resizeImage,
    CategoryController.updateById
  )
  .delete(requireAuth, requireRole("admin"), CategoryController.deleteById);

module.exports = router;
