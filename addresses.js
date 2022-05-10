const express = require("express");
const router = express.Router();
const getAddresses = require("./controllers/getAddresses");

router.get("/", async (req, res) => {
  getAddresses().then((data) => {
    res.send(data);
  });
});

module.exports = router;
