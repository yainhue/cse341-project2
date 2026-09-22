// add express and set the router
const router = require("express").Router();

// requiere the validation rules
const { productValidationRules, validate } = require("../validator.js");

const productsControllers = require("../controllers/products");

router.get("/", productsControllers.getAll);

router.get("/:id", productsControllers.getSingle);

// pass the validation first, then proceed if no errors are found, else throw an error msg.
router.post(
  "/",
  productValidationRules(),
  validate,
  productsControllers.createProduct,
);

router.put(
  "/:id",
  productValidationRules(),
  validate,
  productsControllers.updateProduct,
);

router.delete("/:id", productsControllers.deleteProduct);

module.exports = router;
