const deliveryModel = require("../models/deliveries");
const addressModel = require("../models/addresses");

const getInfoForDelivery = async () => {
  let deliveryInfo = [];
  const deliveryRaw = await deliveryModel.find({});

  const deliveryParsed = deliveryRaw.map((e, index) => {
    deliveryInfo[index] = {
      id: index,
      name: e.ShipToName.Value,
      address: `${e.ShipToStreet.Value} ${e.ShipToCity.Value} ${e.ShipToState.Value}`,
      postalCode: e.ShipToZip.Value,
      date: e.CreateDate.Value,
    };
    const street = e.ShipToStreet.Value;
    const city = e.ShipToCity.Value;
    const postalCode = e.ShipToZip.Value;
    const address = `${street} ${city} ${postalCode}`;
    return address;
  });

  const delivery = Promise.allSettled(
    deliveryParsed.map(async (e, index) => {
      const test = await addressModel.findOne({
        address: { $regex: `^${e}$` },
      });
      deliveryInfo[index].position = test.latLng;
    })
  );
  const result = delivery.then((e) => {
    return deliveryInfo;
  });
  return result;
};

module.exports = getInfoForDelivery;
