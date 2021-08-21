const _ = require('lodash');

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
  const maskLength = _.min([maskOptions.maskLength, _.max([
    data.length - maskOptions.unmaskedStartCharacters - maskOptions.unmaskedEndCharacters,
    0])]);

  return data.substr(0, maskOptions.unmaskedStartCharacters)
    + _.repeat(maskOptions.maskWith, maskLength)
    + data.substr(_.max([data.length - maskOptions.unmaskedEndCharacters,
      maskOptions.unmaskedStartCharacters]));
};

StringHelper.isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }

  return true;
};

StringHelper.formUrlEncoded = (data) => Object.keys(data).reduce((result, key) => `${result}&${key}=${encodeURIComponent(data[key])}`, '');

StringHelper.generateRandomString = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
