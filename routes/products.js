// add express and set the router
const router = require("express").Router();

// requiere the validation rules
const { productValidationRules, validate } = require("../validator.js");

// require the auth middleware
const { isAuthenticated } = require("../middleware/authenticate.js");

const productsControllers = require("../controllers/products");

router.get("/", productsControllers.getAll);

router.get("/:id", productsControllers.getSingle);

// check if authed, pass the validation, then proceed if no errors are found, else throw an error msg.
router.post(
  "/",
  isAuthenticated,
  productValidationRules(),
  validate,
  productsControllers.createProduct,
);

router.put(
  "/:id",
  isAuthenticated,
  productValidationRules(),
  validate,
  productsControllers.updateProduct,
);

router.delete("/:id", isAuthenticated, productsControllers.deleteProduct);

module.exports = router;
