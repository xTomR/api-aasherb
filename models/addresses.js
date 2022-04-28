const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  latLng: {
    type: Object,
  },
});

const addressModel = mongoose.model("addresses", addressSchema);
module.exports = addressModel;
