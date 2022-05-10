const express = require("express");
const router = express.Router();
const getInfoForDelivery = require("../controllers/getInfoForDelivery");

router.get("/", async (req, res) => {
  getInfoForDelivery().then((data) => {
    res.send(data);
  });
});

module.exports = router;
