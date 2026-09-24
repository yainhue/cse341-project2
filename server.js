const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

// add mongodb
const mongodb = require("./data/database");

// body parser
app.use(bodyParser.json());

// enable routes to be worked across sites
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    }),
  )
  // This is the basic express session({...}) initialization.
  // init passport on every route call.
  .use(passport.initialize())
  // allow passport to use "express-session".
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE",
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes/index.js"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      //});
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// LOG THE USER IN ANY REQUEST!
app.use((req, res, next) => {
  if (req.session.user !== undefined) {
    console.log("Session user:", req.session.user.username);
  }
  next();
});

// send to the router
app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Project 2 - Logged in as ${req.session.user.username}`
      : "Project 2 - Logged Out",
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

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
