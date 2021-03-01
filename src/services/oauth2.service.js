const bcrypt = require('bcrypt');
const uuid = require('uuid');
const _ = require('lodash');
const OauthServer = require('express-oauth-server');
const {
  User, OauthAccessToken, OauthRefreshToken
} = require('../models');
const JWTHelper = require('../helpers/jwt.helper');
// const oauth2Config = require('../config/oauth2');

// const ALLOWED_GRANT_TYPES = [
//   'client_credentials',
//   'password',
//   'refresh_token'
// ];

const model = {
  getAccessToken: (bearerToken) => JWTHelper
    .verifyAccessToken(bearerToken)
    .then((payload) => (payload ? OauthAccessToken.findOne({ id: payload.id }) : null)),

  getRefreshToken: (bearerToken) => JWTHelper
    .verifyRefreshToken(bearerToken)
    .then((payload) => (payload ? OauthRefreshToken.findOne({ id: payload.id }) : null)),

  getUser: (username, password) => User
    .findOne({
      where: {
        username
      }
    })
    .then((user) => (user && bcrypt.compareSync(password, user.passwordHash) ? user : null)),

  saveToken: (token, client, user) => Promise
    .all(_.concat(
      // Save access token
      token.accessToken ? [OauthAccessToken.create({
        id: token.accessToken.id,
        clientId: token.accessToken.payload.clientId,
        userId: token.accessToken.payload.userId,
        scopes: token.accessToken.scope,
        expiresAt: token.accessTokenExpiresAt,
        revoked: false,
      })] : [],
      // Save refresh token
      token.refreshToken ? [OauthRefreshToken.create({
        id: token.accessToken.id,
        clientId: token.accessToken.payload.clientId,
        userId: token.accessToken.payload.userId,
        scopes: token.refreshToken.scope,
        expiresAt: token.refreshTokenExpiresAt,
        revoked: false,
      })] : [],
    ))
    .then(() => _.merge(token, {
      accessToken: _.get(token, 'accessToken.token'), refreshToken: _.get(token, 'refreshToken.token'), user, client
    })),

  revokeToken: async(token) => {
    // @TODO revoke token when user logout
    console.log(token);
  },

  validateScope: (user, client, scope) => scope || true,

  generateAccessToken: (client, user, scope) => {
    const id = uuid.v4();
    const payload = {
      id,
      userId: user.id,
      clientId: client.id,
      scope
    };

    return { id, token: JWTHelper.generateAccessToken(payload), payload };
  },

  generateRefreshToken: (client, user, scope) => {
    const id = uuid.v4();
    const payload = {
      id,
      userId: user.id,
      clientId: client.id,
      scope
    };

    return { id, token: JWTHelper.generateRefreshToken(payload), payload };
  },
};

const Oauth2Service = module.exports;

Oauth2Service.buildOauthServer = () => new OauthServer({ model });

Oauth2Service.token = () => {
  const server = new OauthServer({ model });

  return server.token();
};
