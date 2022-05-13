const express = require("express");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");
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

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `https://www.aasherb.com/login/success`,
    failureRedirect: `https://www.aasherb.com/login/failure`,
    passReqToCallback: true,
  }),
  (req, res) => {
    res.send(req.user);
  }
);
router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
