/**
 * @file userproMiddleware.js
 * @description ce fichier contient les middlewares pour les rôles et de vérification de token
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const { verifyToken } = require('../helpers/jwtHelper');
const tables = require('../../database/table');

/**
 * Middleware to check authentication and permissions
 */
function authMiddleware(requiredPermission) {
    return async (req, res, next) => { 
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Access denied' });
            }
            // const token = authHeader.split(' ')[1];
            const token = authHeader.replace('Bearer ', '').trim();

            const decoded = verifyToken(token);
            if (!decoded) {

                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
           
            // 🔒 Vérifier les permissions si nécessaire
            if (requiredPermission) {

                const permissions = await tables.role_permissions.getPermissionsByRoleId(decoded.role_id);
                req.user.permissions = permissions.map(p => p.name);  // ➡️ Attribuer les noms des permissions à req.user.permissions          

                // const hasPermission = permissions.some(p => p.name === requiredPermission);
                const hasPermission = req.user.permissions.includes(requiredPermission);
                if (!hasPermission) {
                    return res.status(403).json({ error: 'Forbidden' });
                }
            }
            next();
        } catch (error) {
            console.error("❌ Erreur dans authMiddleware:", error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    };
}

module.exports = authMiddleware;