// authMiddleware.js
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const msg = require('../utils/message');

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json(msg.resp(null, "Token not found. (6f7030)", 401));

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).json(msg.resp(null, "Invalid Token (6f7031)", 401));

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json(msg.resp(null, "Invalid Token (6f7032)", 401));

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).json(msg.resp(null, "Invalid Token (6f7033)", 401));

        req.userId = decoded.id;
        return next();
    });
};
