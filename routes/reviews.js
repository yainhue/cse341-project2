// add express and set the router
const router = require("express").Router();

// requiere the validation rules
const { reviewValidationRules, validate } = require("../validator.js");

// require the auth middleware
const { isAuthenticated } = require("../middleware/authenticate.js");

const reviewsControllers = require("../controllers/reviews");

router.get("/", reviewsControllers.getAll);

router.get("/:id", reviewsControllers.getSingle);

// pass the validation first, then proceed if no errors are found, else throw an error msg.
router.post(
  "/",
  isAuthenticated,
  reviewValidationRules(),
  validate,
  reviewsControllers.createReview,
);

router.put(
  "/:id",
  isAuthenticated,
  reviewValidationRules(),
  validate,
  reviewsControllers.updateReview,
);

router.delete("/:id", isAuthenticated, reviewsControllers.deleteReview);

module.exports = router;
