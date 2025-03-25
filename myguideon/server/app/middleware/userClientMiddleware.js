/**
 * @file userClientMiddleware.js
 * @description   Middleware pour les utilisateurs client
 * @module   Middleware userClientMiddleware
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */

function userClientMiddleware(req,res,next) {
    if (req.user.role_id !== 3) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}

module.exports = userClientMiddleware;