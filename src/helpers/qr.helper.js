const qrcode = require('qrcode');

const { url } = require('../config/app');

module.exports = {
  toFile: async(filePath, content) => {
    await qrcode.toFile(filePath, content);

    return `${url}/qr/${filePath.split('/').pop()}`;
  }
};
