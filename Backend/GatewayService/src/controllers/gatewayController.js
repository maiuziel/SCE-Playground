// gateway-service/src/controllers/gatewayController.js
import axios from 'axios';
import 'dotenv/config';

const forwardAuthRequests = async (req, res, next) => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const path = req.originalUrl.replace('/auth', '');
    const url = `${authServiceUrl}${path}`;

    console.log('Forwarding request to ' + url, ' body: ' + req.body);

    // Forward the exact method and body
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Error from the microservice or network
    console.log('Error while forwarding request to auth service. Error: ', error, error?.data);

    if (error.response) {
      // The microservice responded with an error status
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

const forwardSalesRequests = async (req, res, next) => {
  try {
    // שימי לב: הכתובת צריכה להתאים למיקום שבו רץ Sales-service שלך
    const salesServiceUrl = 'http://localhost:4003/sales';

    const response = await axios({
      method: req.method,
      url: salesServiceUrl,
      data: req.body,
      headers: req.headers,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to sales service:', error.message);
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

export { forwardAuthRequests,forwardSalesRequests };
