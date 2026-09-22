// add express and set the router
const router = require("express").Router();

// requiere the validation rules
const { reviewValidationRules, validate } = require("../validator.js");

const reviewsControllers = require("../controllers/reviews");

router.get("/", reviewsControllers.getAll);

router.get("/:id", reviewsControllers.getSingle);

// router.post("/", reviewsControllers.createReview);

// router.put("/:id", reviewsControllers.updateReview);

// pass the validation first, then proceed if no errors are found, else throw an error msg.
router.post(
  "/",
  reviewValidationRules(),
  validate,
  reviewsControllers.createReview,
);

router.put(
  "/:id",
  reviewValidationRules(),
  validate,
  reviewsControllers.updateReview,
);

router.delete("/:id", reviewsControllers.deleteReview);

module.exports = router;
