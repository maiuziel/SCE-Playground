// gateway-service/src/controllers/gatewayController.js
import axios from 'axios';
import 'dotenv/config';

const forwardAuthRequests = async (req, res, next) => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const path = req.originalUrl.replace('/auth', '');
    const url = `${authServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ` body: ${req.body}`);

    const response = await axios.request({
      method: req.method,
      url,
      data: req.body,
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to auth service:', error, error?.data);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

export async function ping(req, res, next) {
  try {
    return res.status(200).json({ message: 'pong' });
  } catch (error) {
    return next(error);
  }
}

const forwardLeadsRequests = async (req, res, next) => {
  try {
    const leadsServiceUrl = process.env.LEADS_SERVICE_URL;
    const path = req.originalUrl.replace(/^\/leads/, '');
    const url = `${leadsServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ' body: ', req.body);

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
    });

    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to leads service:', error, error?.data);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return next(error);
  }
};

const forwardTechSupportRequests = async (req, res, next) => {
  try {
    const techSupServiceUrl = process.env.TECH_SUP_SERVICE_URL;
    const path = req.originalUrl.replace('/ts', '');
    const url = `${techSupServiceUrl}${path}`;

    console.log('Forwarding request to ' + url, ' body: ' + req.body);

    const response = await axios.request({
      method: req.method,
      url,
      data: req.body,
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to tech support:', error, error?.data);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

const forwardSalesRequests = async (req, res, next) => {
  try {
    const salesServiceUrl = process.env.SALES_SERVICE_URL;
    const path = req.originalUrl.replace('/sales', '');
    const url = `${salesServiceUrl}/sales${path}`;

    console.log('Forwarding request to sales service:', url);
    console.log('Forwarding data to sales service:', req.body);

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (compatible; Render-Gateway/1.0)',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to sales service:', error.message);

    try {
      console.log('error.response?.status:', error.response?.status);
      console.log('error.response?.data:', error.response?.data);
    } catch (jsonErr) {
      console.log('error.message:', error.message);
    }

    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Unknown gateway error' });
  }
};

const forwardProductsRequests = async (req, res, next) => {
  try {
    const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL;
    const path = req.originalUrl.replace('/products', '');
    const url = `${productsServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ` body: ${req.body}`);

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('Error while forwarding request to products service:', error, error?.data);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

const forwardFinanceRequests = async (req, res, next) => {
  try {
    const financeServiceUrl = process.env.FINANCE_SERVICE_URL;
    const path = req.originalUrl.replace('/finance', '');
    const url = `${financeServiceUrl}${path}`;
    console.log('Final URL being requested:', url);

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Success from finance:', response.data);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error while forwarding to Finance Service:', error.message);
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

export {
  forwardAuthRequests,
  forwardLeadsRequests,
  forwardProductsRequests,
  forwardTechSupportRequests,
  forwardSalesRequests,
  forwardFinanceRequests,
};
