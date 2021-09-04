const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { get } = require('lodash');

const path = require('path');
const format = require('string-template');

const TAIL_INDEX_JSON_EXTENSION = -5;
const basename = path.basename(__filename);
const messages = {};

readdirSync(__dirname)
  .filter(
    (file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(TAIL_INDEX_JSON_EXTENSION) === '.json')
  )
  .forEach((file) => {
    messages[file.slice(0, TAIL_INDEX_JSON_EXTENSION)] = JSON.parse(readFileSync(join(__dirname, file)));
  });

/**
 *
 * @param {string} code
 * @param {object} data
 * @param {string} locale
 * @return {string}
 */
global.t = (code, data = {}, locale = 'vn') => format(get(messages[locale], code, code), data);

/**
 *
 * @param {string} locale
 * @returns {object}
 */
global.getLocaleMessages = (locale = 'vn') => messages[locale];
