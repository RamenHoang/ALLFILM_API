const { readFileSync } = require('fs');
const { join } = require('path');
const _ = require('lodash');
const config = require('../config/app');

const locale = config.locale || 'vn';
const messages = JSON.parse(readFileSync(join(__dirname, `./${locale}.json`))) || {};

global.t = (code) => _.get(messages, code, code);
global.getLocaleMessages = () => messages;
