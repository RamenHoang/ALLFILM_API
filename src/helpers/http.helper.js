const axios = require('axios');
const winston = require('winston');

const HttpHelper = module.exports;

HttpHelper.request = async(urlOptions, data) => {
  winston.debug(`[HTTP] Make request: ${urlOptions.url}`);
  winston.debug('[HTTP] Make header', urlOptions.headers);
  winston.debug('[HTTP] Make params', urlOptions.params);
  winston.debug('[HTTP] Data request', data);
  const response = await axios.request({ ...urlOptions, ...{ data } });

  winston.debug('[HTTP] Data response', response.data);

  return response;
};

HttpHelper.get = async(url) => {
  winston.debug(`[HTTP] Make request: ${url}`);

  const response = await axios.get(url);

  winston.debug('[HTTP] Data response', response.data);

  return response;
};
