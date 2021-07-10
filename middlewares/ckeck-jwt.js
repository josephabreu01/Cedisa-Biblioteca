const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
    let token = req.headers["autorizacion"];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Fallo al autenticar el token'
                })
            } else {

                req.decoded = decoded;
                next();
            }

        })
    } else {
        res.status(403).json({
            success: false,
            message: 'Sin token '
        })
    }
}