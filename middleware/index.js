const jwt = require('jsonwebtoken');
const loadsh = require('lodash');
const { get } = loadsh;

// 2.JWT implementation
module.exports = {
  jwtVerification(req, res, next) {
    const token = get(req, 'headers.authorization', '').slice(7);
    jwt.verify(token, 'MY_SECRET_KEY', { algorithm: 'HS256' }, (err, data) => {
      if (err) {
        res.status(403).json({ success: false, message: err });
      }
      else {
        next();
      }
    });
  }
};
