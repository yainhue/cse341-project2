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
