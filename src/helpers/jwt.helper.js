const jwt = require('jsonwebtoken');
const oauth2Config = require('../config/oauth2');

const JWTHelper = module.exports;

JWTHelper.verifyAccessToken = (token) => jwt.verify(token, oauth2Config.accessTokenSecret);

JWTHelper.verifyRefreshToken = (token) => jwt.verify(token, oauth2Config.refreshTokenSecret);

JWTHelper.generateAccessToken = (payload) => jwt.sign(
  payload, oauth2Config.accessTokenSecret, { expiresIn: oauth2Config.accessTokenTTL }
);

JWTHelper.generateRefreshToken = (payload) => jwt.sign(
  payload, oauth2Config.refreshTokenSecret, { expiresIn: oauth2Config.refreshTokenTTL }
);
