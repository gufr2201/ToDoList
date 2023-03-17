const jwt = require('jsonwebtoken');

exports.authMiddleware = function authMiddleware(req, res, next) {
    const {authHeader} = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.sendStatus(401);
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}