const factory = require("./handlerFactory");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

class OrderController {
  static Model = Order;

  /**
   * @desc    Create order
   * @route   POST  /api/v1/orders
   * @access  Public
   */
  static createOne = async (req, res, next) => {
    try {
      const cartItems = req.body.cartItems;
      const productsIds = Object.keys(cartItems);
      const products = await Product.find({ _id: { $in: productsIds } });

      // Calculate the total price
      let totalOrderPrice = 0;
      const cart = [];
      products.forEach((product) => {
        const quantity = cartItems[product.id].quantity;
        totalOrderPrice += product.price * quantity;

        cart.push({ product, quantity, price: product.price });
      });

      const order = await this.Model.create({
        user: req.user._id,
        cartItems: cart,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice,
      });

      // After creating order, decrement product quantity, increment product sold
      if (order) {
        const bulkOption = cart.map((item) => ({
          updateOne: {
            filter: { _id: item.product },
            update: {
              $inc: { quantity: -item.quantity, sold: +item.quantity },
            },
          },
        }));

        await Product.bulkWrite(bulkOption, {});

        res
          .status(201)
          .json(new ApiResponse("order created successfully", { order }, "OK"));
      }
    } catch (err) {
      next(new ApiError(err, 500));
    }
  };

  /**
   * @desc    Get specific order by id
   * @route   GET /api/v1/orders/:id
   * @access  Public
   */
  static getById = factory.getById(this.Model);

  /**
   * @desc    Get list of orders
   * @route   GET /api/v1/orders
   * @access  Public
   */
  static getAll = factory.getAll(this.Model);

  /**
   * @desc    Update specific order
   * @route   PUT /api/v1/orders/:id
   * @access  Private/admin
   */
  static updateById = factory.updateById(this.Model);

  /**
   * @desc    Delete specific order
   * @route   DELETE /api/v1/orders/:id
   * @access  Private/Admin
   */
  static deleteById = factory.deleteById(this.Model);
}

module.exports = OrderController;
