const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  SOID: {},
  SONumber: {},
  CustomerNumber: {},
  optBillToNumber: {},
  optShipToNumber: {},
  Description: {},
  PONumber: {},
  Remarks: {},
  Message: {},
  Status: {},
  Date: {},
  ReqDate: {},
  CreateDate: {},
  LastUpdate: {},
  SalesRep: {},
  DiscountRate: {},
  Discount: {},
  TaxCode: {},
  Tax: {},
  Total: {},
  OnHoldCode: {},
  OrderType: {},
  ChargeAccountID: {},
  ChargeMethod: {},
  Term: {},
  Freight: {},
  BilledFreight: {},
  ShipToATTN: {},
  ShipToStreet: {},
  ShipToCity: {},
  ShipToState: {},
  ShipToZip: {},
  ShipToCountry: {},
  ShipMethod: {},
  ShipToName: {},
  MailToATTN: {},
  MailToNam: {},
  MailToStreet: {},
  MailToCity: {},
  MailToState: {},
  MailToZip: {},
  MailToCountry: {},
  Warehouse: {},
  Dropship: {},
  Branch: {},
  Details: {},
});

const deliveryModel = mongoose.model("deliveries", deliverySchema);
module.exports = deliveryModel;