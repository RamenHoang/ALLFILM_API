const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const appConfig = require('./src/config/app');

module.exports = () => {
  if (!winston.format) return;

  const formats = [];
  const auditLogFormats = [];
  const timestampFormat = winston.format((info) => {
    const dateString = `${new Date().toISOString()} [${global.process.pid}]`;

    info.level = `${dateString} - ${info.level}`;

    return info;
  });

  formats.push(winston.format.colorize());
  formats.push(timestampFormat());
  formats.push(winston.format.splat());
  formats.push(winston.format.simple());

  auditLogFormats.push(timestampFormat());
  auditLogFormats.push(winston.format.splat());
  auditLogFormats.push(winston.format.simple());

  winston.configure({
    format: winston.format.combine.apply(null, formats),
    transports: [
      new winston.transports.Console({
        handleExceptions: true
      }),
      new DailyRotateFile({
        handleExceptions: true,
        filename: 'logs/%DATE%-access.log',
        datePattern: 'YYYY-MM-DD',
      })
    ]
  });

  winston.loggers.add('auditLog', {
    format: winston.format.combine.apply(null, auditLogFormats),
    transports: [
      new DailyRotateFile({
        handleExceptions: true,
        filename: 'logs/%DATE%-audit.log',
        datePattern: 'YYYY-MM-DD',
      })
    ]
  });

  winston.level = appConfig.logLevel;
};
