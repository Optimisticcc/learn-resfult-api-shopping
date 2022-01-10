const mongoose = require("mongoose");
const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  try {
    const docs = await Product.find().select("name price _id productImage");
    return res.status(200).json({
      count: docs.length,
      products: docs.map((doc) => {
        return {
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id,
          },
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      ...req.body,
    });
    const isSaved = await product.save();
    if (isSaved) {
      return res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getProductByID = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const doc = await Product.findById(id).select(
      "name price _id productImage"
    );
    if (doc) {
      return res.status(200).json({
        product: doc,
        request: {
          type: "GET",
          url: "http://localhost:3000/products",
        },
      });
    }
    return res
      .status(404)
      .json({ message: "No valid entry found for provided ID" });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      message: "Product updated",
      request: {
        type: "GET",
        url: "http://localhost:3000/products/" + id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Product deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/products",
        body: { name: "String", price: "Number" },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
