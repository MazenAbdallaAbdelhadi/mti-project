const { v4: uuid } = require("uuid");
const sharp = require("sharp");
const factory = require("./handlerFactory");
const User = require("../models/user.model");
const { uploadSingleImage } = require("../middleware/uploadImg.middleware");
const asyncHandler = require("../utils/asyncHandler");

class UserController {
  static Model = User;
  static uploadUserImage = uploadSingleImage("profileImg");
  static resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuid()}-${Date.now()}.jpeg`;

    if (req.file) {
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/users/${filename}`);

      // Save image into our db
      req.body.profileImg = filename;
    }

    next();
  });

  /**
   * @desc    Create new user
   * @route   POST  /api/v1/users
   * @access  Private/admin
   */
  static createOne = factory.createOne(this.Model);

  /**
   * @desc    Get user by id
   * @route   GET /api/v1/users/:id
   * @access  Public
   */
  static getById = factory.getById(this.Model);

  /**
   * @desc    Get list of users
   * @route   GET /api/v1/users
   * @access  Public
   */
  static getAll = factory.getAll(this.Model);

  /**
   * @desc    Update specific user
   * @route   PUT /api/v1/users/:id
   * @access  Private/admin
   */
  static updateById = factory.updateById(this.Model);

  /**
   * @desc    Delete specific user
   * @route   DELETE /api/v1/users/:id
   * @access  Private/Admin
   */
  static deleteById = factory.deleteById(this.Model);
}

module.exports = UserController;
