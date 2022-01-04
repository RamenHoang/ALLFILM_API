const _ = require('lodash');
const winston = require('winston');
const StringHelper = require('./string.helper');

const maskedKey = [
  'authorization',
  'firebase_key',
  'api_key',
  'client_secret',
  'client_id'
];

const getMaskedPaths = (key, value, maskedPaths = [], path = '') => {
  if (_.isArray(value)) {
    _.each(value, (eValue, eKey) => {
      getMaskedPaths(eKey, eValue, maskedPaths, `${path}.[${eKey}]`);
    });
  }
  if (_.isObject(value) && !_.isArray(value)) {
    _.forIn(value, (eValue, eKey) => {
      getMaskedPaths(eKey, eValue, maskedPaths, path.length === 0 ? `${eKey}` : `${path}.${eKey}`);
    });
  }

  if (_.isString(value) && !_.isEmpty(value) && _.indexOf(maskedKey, key) >= 0) {
    maskedPaths.push(path);
  }
};

const formatData = (data) => {
  const maskedPaths = [];

  getMaskedPaths(null, data, maskedPaths);

  _.each(maskedPaths, (path) => {
    _.set(data, path, StringHelper.mask(_.get(data, path), {
      unmaskedStartCharacters: 5,
      unmaskedEndCharacters: 0,
      maskLength: 10
    }));
  });

  return data;
};

const logAudit = (request, response, responseCode) => {
  const method = _.get(request, 'method');

  if (_.indexOf([
    'POST',
    'PUT',
    'DELETE'
  ], method) >= 0) {
    const currentUser = _.get(request, 'currentUser.accountName');
    const url = _.get(request, 'url');
    const query = _.get(request, 'query');
    const params = _.get(request, 'params');
    const body = _.get(request, 'body');
    const headers = _.get(request, 'headers');

    const data = `${method}\t'${url}'\t'${currentUser}'\t'${JSON.stringify({
      headers: formatData(headers),
      query,
      params,
      body: formatData(body),
      responseCode,
      response: formatData(response)
    })}'`;

    winston.loggers.get('auditLog').info(data);
  }
};

const successResponse = (req, res, data = {}, code) => {
  try {
    logAudit(req, data);
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return res.status(code)
    .send(data);
};
const errorResponse = (req, res, error = {}, code) => {
  try {
    logAudit(req, error);
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return res.status(code)
    .send({ error });
};

const ResponseHelper = module.exports;

ResponseHelper.ok = (req, res, data) => successResponse(req, res, data, 200);
ResponseHelper.created = (req, res, data) => successResponse(req, res, data, 201);
ResponseHelper.noContent = (req, res) => successResponse(req, res, null, 204);
ResponseHelper.error = (req, res, error) => {
  const statusCode = _.get(error.output, 'httpStatusCode', 500);

  errorResponse(req, res, {
    message: statusCode === 500 ? t('internal_server_error') : t(error.message),
    code: _.get(error.output, 'code', 'INTERNAL_SERVER_ERROR'),
    errors: _.get(error.output, 'errors', [])
  }, statusCode);
};
