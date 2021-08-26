const fs = require('fs');
const https = require('https');
const app = require('./webserver');
const appConfig = require('./src/config/app');
const sslConfig = require('./src/config/ssl');

const privateKey = fs.readFileSync(`${sslConfig.privKeyPath}`, 'utf8');
const certificate = fs.readFileSync(`${sslConfig.certPath}`, 'utf8');
const ca = fs.readFileSync(`${sslConfig.chainPath}`, 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca
};

const host = appConfig.host || 'localhost';
const port = appConfig.port || 5000;

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, host, () => {
  console.log(`Server listening on https://${host}:${port}`);
});
