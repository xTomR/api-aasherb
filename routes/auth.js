const express = require("express");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");
let corsOptions = {
  // origin: [
  //   "https://www.aasherb.com",
  //   "https://www.aasherb.com/home",
  //   "https://www.aasherb.com/login",
  //   "https://www.aasherb.com/login/success",
  //   "https://www.aasherb.com/login/failure",
  // ],
  origin: true,
  credentials: true,
};

router.get("/login", cors(corsOptions), (req, res) => {
  if (req.user) {
    res.json(req.user);
    console.log(req.user);
  } else {
    console.log(`error`);
  }
});

router.get("/logout", cors(corsOptions), (req, res) => {
  req.session = null;
  res.send("done");
});

router.get(
  "/google",
  cors(corsOptions),
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  cors(corsOptions),
  passport.authenticate("google", {
    successRedirect: `https://www.aasherb.com/login/success`,
    failureRedirect: `https://www.aasherb.com/login/failure`,
    passReqToCallback: true,
  }),
  (req, res) => {
    res.send(req.user);
  }
);
router.get("/user", cors(corsOptions), (req, res) => {
  res.send(req.user);
});

module.exports = router;
