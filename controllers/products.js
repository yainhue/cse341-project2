const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=["Products"]
  try {
    const result = await mongodb.getDatabase().collection("products").find();
    const products = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    err.status = 500;
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=["Products"]
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("products")
      .find({ _id: productId });

    const products = await result.toArray();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "Error fetching product: Not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products[0]);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    err.status = 500;
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  //#swagger.tags=["Products"]
  try {
    const product = {
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
      .insertOne(product);

    if (response.acknowledged) {
      res.status(201).json({ message: "Product created successfully!" });
    } else {
      res.status(500).json({ message: "Failed to create product" });
    }
  } catch (err) {
    console.error("Error creating product:", err.message);
    err.status = 500;
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  //#swagger.tags=["Products"]
  try {
    const productId = new ObjectId(req.params.id);
    const product = {
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
      .replaceOne({ _id: productId }, product);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Product updated successfully!" });
    } else {
      res.status(404).json({ message: "Product not found or not updated" });
    }
  } catch (err) {
    console.error("Error updating product:", err.message);
    err.status = 500;
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  //#swagger.tags=["Products"]
  try {
    const productId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("products")
      .deleteOne({ _id: productId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error deleting product:", err.message);
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
