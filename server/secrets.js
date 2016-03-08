// Secrets
if (process.env.NODE_ENV === 'production') {
  var SESSION_SECRET = process.env.SESSION_SECRET;
  var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
  var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
  var CALLBACK_URL = 'http://knowit.co/auth/facebook/callback';
} else {
  var SESSION_SECRET = 'asda2313sgnfjbkj28b2k34bh##$%R&%E^$%WTD))';
  var FACEBOOK_APP_ID = '770035869769689';
  var FACEBOOK_APP_SECRET = 'dd779df7d5672a81da00a0b9ffe1e77d';
  var CALLBACK_URL = 'http://localhost:8888/auth/facebook/callback';
}

module.exports = {
  sql: '8413',
  FACEBOOK_APP_ID: FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: FACEBOOK_APP_SECRET,
  SESSION_SECRET: SESSION_SECRET,
  CALLBACK_URL: CALLBACK_URL
};
