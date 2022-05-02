const deliveryModel = require("../models/deliveries");
const addressModel = require("../models/addresses");
const axios = require("axios");

const getAddressesFromDelivery = async () => {
  const deliveryRaw = await deliveryModel
    .find({})
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  const deliveryParsed = deliveryRaw.map((e) => {
    const street = e.ShipToStreet.Value;
    const city = e.ShipToCity.Value;
    const postalCode = e.ShipToZip.Value;
    const address = `${street} ${city} ${postalCode}`;
    return address;
  });

  deliveryParsed.map((e) => {
    addressModel
      .findOne({ address: { $regex: `^${e}$` } })
      .then(async (data) => {
        if (data === null) {
          const position = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${e}=&key=${process.env.GOOGLE_BACKEND_KEY}`
          );
          console.log(position.data.results[0].place_id);
          addressModel.create({
            address: e,
            latLng: position.data.results[0].geometry.location,
            placeId: position.data.results[0].place_id,
          });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = getAddressesFromDelivery;
