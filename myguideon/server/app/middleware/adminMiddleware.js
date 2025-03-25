/**
 * @file  adminMiddleware
 * @description   Middleware pour les utilisateurs admin
 * @module  Middleware adminMiddleware
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */

function adminMiddleware(req,res,next) {
    if (req.user.role_id !== 1) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}

module.exports = adminMiddleware;