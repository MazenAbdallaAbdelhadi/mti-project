const factory = require("./handlerFactory");
const Review = require("../models/review.model");

class ReviewController {
  static Model = Review;

  /**
   * @desc    Create review
   * @route   POST  /api/v1/reviews
   * @access  Private/admin
   */
  static createOne = factory.createOne(this.Model);

  /**
   * @desc    Get specific review by id
   * @route   GET /api/v1/reviews/:id
   * @access  Public
   */
  static getById = factory.getById(this.Model);

  /**
   * @desc    Get list of reviews
   * @route   GET /api/v1/reviews
   * @access  Public
   */
  static getAll = factory.getAll(this.Model);

  /**
   * @desc    Update specific review
   * @route   PUT /api/v1/reviews/:id
   * @access  Private/admin
   */
  static updateById = factory.updateById(this.Model);

  /**
   * @desc    Delete specific review
   * @route   DELETE /api/v1/reviews/:id
   * @access  Private/Admin
   */
  static deleteById = factory.deleteById(this.Model);
}

module.exports = ReviewController;
