const { body, validationResult } = require("express-validator");

const productValidationRules = () => {
  return [
    body("name").isString().withMessage("Name must be a string"),

    body("sku")
      .isLength({ min: 11 })
      .withMessage("SKU must be at least 11 characters long"),

    body("price").isInt().withMessage("Price must be an integer"),

    body("stock").isInt().withMessage("Stock must be an integer"),

    body("category").isString().withMessage("Category must be a string"),

    body("isActive").isBoolean().withMessage("isActive must be true or false"),

    body("createdAt")
      .isString()
      .withMessage("createdAt must be a valid string (ISO date)"),
  ];
};

const reviewValidationRules = () => {
  return [
    body("productId")
      .isString()
      .withMessage("ProductId must be a string")
      .isLength({ min: 24 })
      .withMessage("ProductId must be 24 characters long"),

    body("userId")
      .isString()
      .withMessage("UserId must be a string")
      .isLength({ min: 24 })
      .withMessage("UserId must be 24 characters long"),

    body("reviewerName")
      .isString()
      .withMessage("ReviewerName must be a string"),

    body("content").isString().withMessage("Content must be a string"),

    body("rating").isInt().withMessage("Rating must be an integer"),

    body("isVerifiedPurchase")
      .isBoolean()
      .withMessage("isVerifiedPurchase must be true or false"),

    body("createdAt")
      .isString()
      .withMessage("createdAt must be a valid string (ISO date)"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  //   if there are no errors...
  if (errors.isEmpty()) {
    // continue with the next middleware function
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  console.error(extractedErrors);

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  productValidationRules,
  reviewValidationRules,
  validate,
};
