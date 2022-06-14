const schedule = require("node-schedule");
const deliveryModel = require("../models/deliveries");
const getDataFromEAutomate = require("../controllers/getDataFromEAutomate");
const getAddressesFromDelivery = require("../controllers/getAddressesFromDelivery");

const scheduler = () => {
  schedule.scheduleJob("*/2 * * * *", () => {
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
  });

  schedule.scheduleJob("*/1 * * * *", () => {
    getAddressesFromDelivery();
  });
};

module.exports = scheduler;
