const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Products"]
  const result = await mongodb.getDatabase().collection("products").find();
  result.toArray().then((Products) => {
    res.setHeader("Content-Type", "aplication/json");
    res.status(200).json(Products);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Products"]
  const productId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("products")
    .find({ _id: productId });
  result.toArray().then((Products) => {
    res.setHeader("Content-Type", "aplication/json");
    res.status(200).json(Products);
  });
};

const createProduct = async (req, res) => {
  //#swagger.tags=["Products"]

  const Product = {
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    isActive: req.body.isActive,
    createdAt: req.body.createdAt,
  };

  const response = await mongodb
    .getDatabase()
    .collection("products")
    .insertOne(Product);

  if (response.acknowledged) {
    res.status(200).send("Product created succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the product.");
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  const productId = new ObjectId(req.params.id);
  const Product = {
    name: req.body.name,
    sku: req.body.sku,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    isActive: req.body.isActive,
    createdAt: req.body.createdAt,
  };

  const response = await mongodb
    .getDatabase()
    .collection("products")
    .replaceOne({ _id: productId }, Product);

  if (response.modifiedCount > 0) {
    res.status(200).send("updated succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while updating the product.");
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=["Products"]
  const productId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .collection("products")
    .deleteOne({ _id: productId }, true);

  if (response.acknowledged) {
    res.status(200).send("deleted succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the product.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
