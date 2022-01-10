const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

const getAllOrders = async (req, res, next) => {
  try {
    const docs = await Order.find()
      .select("product quantity _id")
      .populate("product", "name");
    return res.status(200).json({
      count: docs.length,
      orders: docs.map((doc) => {
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + doc._id,
          },
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const order = new Order({
      quantity: req.body.quantity,
      product: req.body.productId,
    });
    const result = await order.save();
    if (!isSaved) {
      return res.status(500).json({
        message: "Internal server",
      });
    }
    return res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity,
      },
      request: {
        type: "GET",
        url: "http://localhost:3000/orders/" + result._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOrderByID = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const doc = await Order.findById(id).populate("product");
    if (!doc) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      order: doc,
      request: {
        type: "GET",
        url: "http://localhost:3000/orders",
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    await Order.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Order deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/orders",
        body: { productId: "ID", quantity: "Number" },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderByID,
  deleteOrder,
};
