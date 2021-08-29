const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if(req.method==="OPTIONS"){
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new HttpError('Authentication failed', 401);
    }
    const decodedtoken = jwt.verify(
      token,
      'ssuuppeerrsseeccrreettdonotshareit'
    );
    req.userData = { userId: decodedtoken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed or try logging in again', 401);
    return next(error);
  }
};
