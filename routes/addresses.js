const express = require("express");
const router = express.Router();
const getAddresses = require("../controllers/getAddresses");
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
  getAddresses().then((data) => {
    res.send(data);
  });
});

module.exports = router;
