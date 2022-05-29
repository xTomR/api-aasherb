const express = require("express");
const router = express.Router();
const deliveryModel = require("../models/deliveries");
const getDataFromEAutomate = require("../controllers/getDataFromEAutomate");
const getAddressesFromDelivery = require("../controllers/getAddressesFromDelivery");

router.get("/", async (req, res) => {
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
