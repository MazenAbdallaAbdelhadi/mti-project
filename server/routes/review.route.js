/**
 * @desc handle the review operations
 * @route api/v1/reviews
 */
const { Router } = require("express");

const ReviewController = require("../controller/review.controller");

const router = Router();

router.route("/").post(ReviewController.createOne).get(ReviewController.getAll);
router
  .route("/:id")
  .get(ReviewController.getById)
  .put(ReviewController.updateById)
  .delete(ReviewController.deleteById);

module.exports = router;
