/**
 * @file userproMiddleware.js
 * @description ce fichier contient les middlewares pour les rôles et de vérification de token
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const {verifyToken} = require("../helpers/jwtHelper");

function userproMiddleware(req,res,next) {
    if (req.user.role_id !== 2) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}

module.exports = userproMiddleware;