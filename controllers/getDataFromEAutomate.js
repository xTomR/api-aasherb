const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const delivery = async () => {
  const getSalesOrderList = async () => {
    let salesOrderDetails = {};
    let salesOrderIds = [];
    const headers = {
      headers: {
        "Content-Type":
          'application/soap+xml;charset=UTF-8;action="http://digitalgateway.com/WebServices/PublicAPIService/getSalesOrderList"',
      },
    };
    const xmls =
      // eslint-disable-next-line no-multi-str
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:pub="http://digitalgateway.com/WebServices/PublicAPIService">\
      <soap:Header/>\
      <soap:Body>\
         <pub:getSalesOrderList>\
            <!--Optional:-->\
            <pub:Auth>\
               <!--Optional:-->\
               <pub:User>${process.env.E_AUTOMATE_USER}</pub:User>\
               <!--Optional:-->\
               <pub:Password>${process.env.E_AUTOMATE_PASSWORD}</pub:Password>\
               <!--Optional:-->\
               <pub:CompanyID>AASherbrooke</pub:CompanyID>\
               <!--Optional:-->\
               <pub:Version>20.1.3.455</pub:Version>\
            </pub:Auth>\
            <!--Optional:-->\
            <pub:TimeStamp>2022-02-09T00:00:00Z</pub:TimeStamp>\
         </pub:getSalesOrderList>\
      </soap:Body>\
   </soap:Envelope>`;
    const parser = new XMLParser();

    const response = await axios.post(
      "https://ea.groupeaa.com/PIP/PublicAPIService.asmx?WSDL",
      xmls,
      headers
    );
    const responseToJSON = parser.parse(response.data);
    salesOrderDetails =
      responseToJSON["soap:Envelope"]["soap:Body"].getSalesOrderListResponse
        .getSalesOrderListResult.Details.SalesOrderListDetail;
    salesOrderIds = salesOrderDetails.map((salesOrder) => {
      return salesOrder.SONumber.ID.Value;
    });

    return salesOrderIds;
  };

  const getSalesOrderInfo = async (salesOrderIds) => {
    let salesOrderInfo = Promise.allSettled(
      salesOrderIds.map(async (saleOrder) => {
        const headers = {
          headers: {
            "Content-Type":
              'application/soap+xml;charset=UTF-8;action="http://digitalgateway.com/WebServices/PublicAPIService/getSalesOrder"',
          },
        };
        const xmls = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:pub="http://digitalgateway.com/WebServices/PublicAPIService">\
        <soap:Header/>\
        <soap:Body>\
           <pub:getSalesOrder>\
              <pub:Auth>\
                 <pub:User>PIP</pub:User>\
                 <pub:Password>XhJ2*hp_</pub:Password>\
                 <pub:CompanyID>AASherbrooke</pub:CompanyID>\
                 <pub:Version>20.1.3.455</pub:Version>\
              </pub:Auth>\
              <pub:SalesOrderNumber>\
                <pub:ID>\
                  <pub:Value>${saleOrder}</pub:Value>\
                  <pub:Valid>true</pub:Valid>\
                </pub:ID>\
            </pub:SalesOrderNumber>\
           </pub:getSalesOrder>\
        </soap:Body>\
     </soap:Envelope>`;
        const parser = new XMLParser();

        const response = await axios.post(
          "https://ea.groupeaa.com/PIP/PublicAPIService.asmx?WSDL",
          xmls,
          headers
        );
        const responseJSON = parser.parse(response.data);

        if (
          responseJSON["soap:Envelope"]["soap:Body"].getSalesOrderResponse
            .getSalesOrderResult.Status.Code.Value === "Open" &&
          responseJSON["soap:Envelope"]["soap:Body"].getSalesOrderResponse
            .getSalesOrderResult.Description.Value === "OK"
        ) {
          let responseInfo =
            responseJSON["soap:Envelope"]["soap:Body"].getSalesOrderResponse
              .getSalesOrderResult;
          return responseInfo;
        }
        return;
      })
    );
    return await salesOrderInfo;
  };

  const parseDelivery = (delivery) => {
    const parsedDelivery = delivery.map((e, index) => {
      // eslint-disable-next-line no-sequences
      return index, e.value;
    });
    return parsedDelivery;
  };

  const filterDelivery = (value) => {
    return value.value;
  };

  const salesOrderList = await getSalesOrderList();
  const salesOrder = await getSalesOrderInfo(salesOrderList);
  const delivery = salesOrder.filter(filterDelivery);
  const parsedDelivery = parseDelivery(delivery);

  return parsedDelivery;
};

module.exports = delivery;
