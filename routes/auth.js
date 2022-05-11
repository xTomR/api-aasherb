const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(405).json("error");
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
    successRedirect: `https://main--fantastic-tartufo-ea633a.netlify.app/login/success`,
    failureRedirect: `https://main--fantastic-tartufo-ea633a.netlify.app/login/failure`,
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
