require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticationMiddleware(req, res, next) {
    const token = req.headers['authorization']
    if (token === "" || token === undefined || token === null) {
      return res.status(401).json({"error": "you are not authorized"})
    }
  
    const payload = jwt.decode(token, process.env.JWTPRIVATEKEY)
    req['user'] = payload
    next();
}

module.exports = {authenticationMiddleware}