const Constants = module.exports;

Constants.PAGINATION = Object.freeze({
  DEFAULT_LIMIT: 25,
  DEFAULT_OFFSET: 0
});

Constants.GRANT_TYPE = Object.freeze({
  CLIENT_CREDENTIAL: 'client_credentials',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token',
  SNS: 'sns'
});

Constants.VALIDATE_ON = Object.freeze({
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
});

Constants.ROLES = Object.freeze({
  ADMIN: 'admin',
  MOD: 'mod'
});

Constants.REGEX = Object.freeze({
  BOTH_USERNAME_EMAIL_ABSOLUTE_STRING: /^(?:[\D][\D\d]{5,}|[a-z.\d]+@[a-z.]+\.[a-z]{2,4})$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@!%*?&]{8,}$/,
  USERNAME_ONLY: /^[\D][\D\d]{5,}$/,
  EMAIL_ONLY: /^[a-z.\d]+@[a-z.]+\.[a-z]{2,4}$/
});
