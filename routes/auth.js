const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(403).json("error");
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.send("done");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "http://localhost:3000/login/failure",
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
