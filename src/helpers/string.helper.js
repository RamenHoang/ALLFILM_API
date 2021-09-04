const { min, repeat, max } = require('lodash');

const StringHelper = module.exports;

StringHelper.mask = (data, options) => {
  data = data || '';
  const defaultMaskOptions = {
    maskWith: '*',
    unmaskedStartCharacters: 3,
    unmaskedEndCharacters: 2,
    maskLength: null
  };

  const maskOptions = {
    ...defaultMaskOptions,
    ...options
  };
  const maskLength = min([maskOptions.maskLength, max([
    data.length - maskOptions.unmaskedStartCharacters - maskOptions.unmaskedEndCharacters,
    0])]);

  return data.substr(0, maskOptions.unmaskedStartCharacters)
    + repeat(maskOptions.maskWith, maskLength)
    + data.substr(max([data.length - maskOptions.unmaskedEndCharacters,
      maskOptions.unmaskedStartCharacters]));
};

/**
 *
 * @param {*} data
 * @returns {boolean}
 */
StringHelper.isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }

  return true;
};

/**
 *
 * @param {object} data
 * @returns {string}
 */
StringHelper.formUrlEncoded = (data) => Object.keys(data)
  .reduce((result, key) => `${result}&${key}=${encodeURIComponent(data[key])}`, '');

/**
 *
 * @param {number} length
 * @returns {string}
 */
StringHelper.generateRandomString = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

/**
 *
 * @param {*} modelObject
 * @returns {object}
 */
StringHelper.modelObjectl2JSobject = (modelObject) => JSON.parse(JSON.stringify(modelObject));
