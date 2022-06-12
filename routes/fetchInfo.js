const express = require("express");
const router = express.Router();
const deliveryModel = require("../models/deliveries");
const getDataFromEAutomate = require("../controllers/getDataFromEAutomate");
const getAddressesFromDelivery = require("../controllers/getAddressesFromDelivery");
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
  getDataFromEAutomate()
    .then(
      (value) => {
        deliveryModel.deleteMany({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
          }
        });
        deliveryModel.insertMany(value, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      },
      (error) => {
        console.log("error");
      }
    )
    .catch((err) => {
      console.log(err);
    });
  getAddressesFromDelivery();
  res.send("fetched");
});

module.exports = router;
