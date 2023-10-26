const { v4: uuid } = require("uuid");
const sharp = require("sharp");
const factory = require("./handlerFactory");
const Category = require("../models/category.model");
const { uploadSingleImage } = require("../middleware/uploadImg.middleware");
const asyncHandler = require("../utils/asyncHandler");

class CategoryController {
  static Model = Category;

  static uploadCategoryImage = uploadSingleImage("image");
  static resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
      const filename = `category-${uuid()}-${Date.now()}.jpeg`;

      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/categories/${filename}`);

      // Save image into our db
      req.body.image = filename;
    }
    next();
  });

  /**
   * @desc    Create category
   * @route   POST  /api/v1/categories
   * @access  Private/admin
   */
  static createOne = factory.createOne(this.Model);

  /**
   * @desc    Get specific category by id
   * @route   GET /api/v1/categories/:id
   * @access  Public
   */
  static getById = factory.getById(this.Model);

  /**
   * @desc    Get list of categories
   * @route   GET /api/v1/categories
   * @access  Public
   */
  static getAll = factory.getAll(this.Model);

  /**
   * @desc    Update specific category
   * @route   PUT /api/v1/categories/:id
   * @access  Private/admin
   */
  static updateById = factory.updateById(this.Model);

  /**
   * @desc    Delete specific category
   * @route   DELETE /api/v1/categories/:id
   * @access  Private/Admin
   */
  static deleteById = factory.deleteById(this.Model);
}

module.exports = CategoryController;
