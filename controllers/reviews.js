const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=["Reviews"]
  try {
    const result = await mongodb.getDatabase().collection("reviews").find();
    const reviews = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    err.status = 500;
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=["Reviews"]
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("reviews")
      .find({ _id: reviewId });

    const reviews = await result.toArray();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews[0]);
  } catch (err) {
    console.error("Error fetching review:", err.message);
    err.status = 500;
    next(err);
  }
};

const createReview = async (req, res, next) => {
  //#swagger.tags=["Reviews"]
  try {
    const review = {
      productId: req.body.productId,
      userId: req.body.userId,
      reviewerName: req.body.reviewerName,
      content: req.body.content,
      rating: req.body.rating,
      isVerifiedPurchase: req.body.isVerifiedPurchase,
      createdAt: req.body.createdAt,
    };

    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .insertOne(review);

    if (response.acknowledged) {
      res.status(201).json({ message: "Review created successfully!" });
    } else {
      res.status(500).json({ message: "Failed to create review" });
    }
  } catch (err) {
    console.error("Error creating review:", err.message);
    err.status = 500;
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  //#swagger.tags=["Reviews"]
  try {
    const reviewId = new ObjectId(req.params.id);
    const review = {
      productId: req.body.productId,
      userId: req.body.userId,
      reviewerName: req.body.reviewerName,
      content: req.body.content,
      rating: req.body.rating,
      isVerifiedPurchase: req.body.isVerifiedPurchase,
      createdAt: req.body.createdAt,
    };

    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .replaceOne({ _id: reviewId }, review);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Review updated successfully!" });
    } else {
      res.status(404).json({ message: "Review not found or not updated" });
    }
  } catch (err) {
    console.error("Error updating review:", err.message);
    err.status = 500;
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  //#swagger.tags=["Reviews"]
  try {
    const reviewId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("reviews")
      .deleteOne({ _id: reviewId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Review deleted successfully!" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (err) {
    console.error("Error deleting review:", err.message);
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createReview,
  updateReview,
  deleteReview,
};
