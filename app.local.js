const appConfig = require('./src/config/app');
const app = require('./webserver');

const host = appConfig.host || 'localhost';
const port = appConfig.port || 5000;

app.listen(port, host);

console.log(`Server listening on http://${host}:${port}`);
