const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dndl.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: 'https://dndl.auth0.com/',
  algoritms: ['RS256']
});
