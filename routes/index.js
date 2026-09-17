// add express and set the router
const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  res.send(
    "Hello World! from index.js (with swagger!) - This is the CSE341 Project 2",
  );
});

router.use("/products", require("./products"));

router.use("/reviews", require("./reviews"));

module.exports = router;
