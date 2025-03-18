const {verifyToken} = require('../helpers/jwtHelper');

function userClientMiddleware(req,res,next) {
    if (req.user.role_id !== 3) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}

module.exports = userClientMiddleware;