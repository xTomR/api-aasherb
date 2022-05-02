const addressModel = require("../models/addresses");

const getAddresses = async () => {
  const addressesRaw = await addressModel.find({});
  return addressesRaw;
};

module.exports = getAddresses;
