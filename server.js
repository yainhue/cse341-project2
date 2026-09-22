const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// add mongodb
const mongodb = require("./data/database");

// body parser
app.use(bodyParser.json());

// enable routes to be worked across sites
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

// send to the router
app.use("/", require("./routes"));

// if the route does not match to the defined routes call this:
app.use((req, res, next) => {
  const error = new Error(
    "Not Found - The page you are looking for does not exist.",
  );
  error.status = 404;
  next(error);
});

// global error handler
app.use((err, req, res, next) => {
  //if the ID format is INVALID:
  if (err.message.includes("24 character hex string")) {
    return res.status(400).json({
      message: "Invalid ID format",
      status: 400,
    });
  }

  // Para otros errores
  res.status(err.status || 500).json({
    message: "Something went wrong. Please try again later.",
    status: err.status || 500,
  });
});

// function to initialize the DB
mongodb.InitDb((err) => {
  // if an error is found, log it
  if (err) {
    console.log(err);
  } else
    app.listen(port, () => {
      console.log(`Database and app listening on port ${port}`);
    });
});
