// add express and set the router
const router = require("express").Router();

const reviewsControllers = require("../controllers/reviews");

router.get("/", reviewsControllers.getAll);

router.get("/:id", reviewsControllers.getSingle);

router.post("/", reviewsControllers.createReview);

router.put("/:id", reviewsControllers.updateReview);

router.delete("/:id", reviewsControllers.deleteReview);

module.exports = router;
