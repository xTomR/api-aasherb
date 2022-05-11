const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const scheduler = require("./schedule/scheduler");
const middlewares = require("./middlewares/index");
const cookieSession = require("cookie-session");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Scheduler
scheduler();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middlewares
app.use(morgan("dev"));
// app.use(helmet());

// Passport config
require("./config/passport")(passport);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/deliveries", require("./routes/deliveries"));
app.use("/api/addresses", require("./routes/addresses"));
app.get("/api", (req, res) => {
  res.send("Home page node server");
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
