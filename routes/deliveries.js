const express = require("express");
const router = express.Router();
const getInfoForDelivery = require("../controllers/getInfoForDelivery");
const cors = require("cors");
let corsOptions = {
  origin: [
    "https://www.aasherb.com",
    "https://www.aasherb.com/home",
    "https://www.aasherb.com/login",
    "https://www.aasherb.com/login/sucess",
    "https://www.aasherb.com/login/failure",
  ],
};

router.get("/", cors(corsOptions), async (req, res) => {
  getInfoForDelivery().then((data) => {
    res.send(data);
  });
});

module.exports = router;
