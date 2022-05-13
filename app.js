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

// Scheduler
scheduler();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
let corsOptions = {
  origin: [
    "https://www.aasherb.com",
    "https://www.aasherb.com/home",
    "https://www.aasherb.com/login",
    "https://www.aasherb.com/login/sucess",
    "https://www.aasherb.com/login/failure",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

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
app.use("/auth", cors(corsOptions), require("./routes/auth"));
app.use("/api/deliveries", require("./routes/deliveries"));
app.use("/api/addresses", require("./routes/addresses"));
app.get("/api", (req, res) => {
  res.send("Home page node server");
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
