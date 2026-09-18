const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Reviews"]
  const result = await mongodb.getDatabase().collection("reviews").find();
  result.toArray().then((Reviews) => {
    res.setHeader("Content-Type", "aplication/json");
    res.status(200).json(Reviews);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Reviews"]
  const reviewId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("reviews")
    .find({ _id: reviewId });
  result.toArray().then((Reviews) => {
    res.setHeader("Content-Type", "aplication/json");
    res.status(200).json(Reviews);
  });
};

const createReview = async (req, res) => {
  //#swagger.tags=["Reviews"]
  const Review = {
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
    .insertOne(Review);

  if (response.acknowledged) {
    res.status(200).send("Review created succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the review.");
  }
};

const updateReview = async (req, res) => {
  //#swagger.tags=["Reviews"]
  const reviewId = new ObjectId(req.params.id);
  const Review = {
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
    .replaceOne({ _id: reviewId }, Review);

  if (response.modifiedCount > 0) {
    res.status(200).send("updated succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while updating the review.");
  }
};

const deleteReview = async (req, res) => {
  //#swagger.tags=["Reviews"]
  const reviewId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .collection("reviews")
    .deleteOne({ _id: reviewId }, true);

  if (response.acknowledged) {
    res.status(200).send("deleted succesfuly!");
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the review.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createReview,
  updateReview,
  deleteReview,
};
