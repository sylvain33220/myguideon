const {verifyToken} = require("../helpers/jwtHelper");

function userproMiddleware(req,res,next) {
    if (req.user.role_id !== 2) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}

module.exports = userproMiddleware;