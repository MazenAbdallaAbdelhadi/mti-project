/**
 * @desc handle the product operations
 * @route api/v1/products
 */
const { Router } = require("express");

const ProductController = require("../controller/product.controller");
const requireAuth = require("../middleware/requireAuth.middleware");
const requireRole = require("../middleware/requireRole.middleware");

const router = Router();

router
  .route("/")
  .post(
    requireAuth,
    requireRole("admin"),
    ProductController.uploadProductImage,
    ProductController.resizeProductImages,
    ProductController.createOne
  )
  .get(ProductController.getAll);
router
  .route("/:id")
  .get(ProductController.getById)
  .put(
    requireAuth,
    requireRole("admin"),
    ProductController.uploadProductImage,
    ProductController.resizeProductImages,
    ProductController.updateById
  )
  .delete(requireAuth, requireRole("admin"), ProductController.deleteById);

module.exports = router;
