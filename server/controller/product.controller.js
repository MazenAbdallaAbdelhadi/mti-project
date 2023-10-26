const { v4: uuid } = require("uuid");
const sharp = require("sharp");
const factory = require("./handlerFactory");
const Product = require("../models/product.model");
const { uploadSingleImage } = require("../middleware/uploadImg.middleware");
const asyncHandler = require("../utils/asyncHandler");

class ProductController {
  static Model = Product;

  static uploadProductImage = uploadSingleImage("imageCover");

  static resizeProductImages = asyncHandler(async (req, res, next) => {
    // Image processing for imageCover
    if (req.file) {
      const imageCoverFileName = `product-${uuid()}-${Date.now()}-cover.jpeg`;

      await sharp(req.file.buffer)
        .resize(800, 800)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);

      // Save image into our db
      req.body.imageCover = imageCoverFileName;
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
  static getById = factory.getById(this.Model, "reviews");

  /**
   * @desc    Get list of categories
   * @route   GET /api/v1/categories
   * @access  Public
   */
  static getAll = factory.getAll(this.Model, "Products");

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

module.exports = ProductController;
