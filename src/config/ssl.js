require('dotenv').config();

module.exports = {
  privKeyPath: process.env.PRIVKEY_PATH,
  certPath: process.env.CERT_PATH,
  chainPath: process.env.CHAIN_PATH
};
