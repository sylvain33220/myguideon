/**
 * @file userproMiddleware.js
 * @description ce fichier contient les middlewares pour les rôles et de vérification de token
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */

function userproMiddleware(req,res,next) {
    if (req.user.role_id !== 2) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}
function checkUserProVerified() {
    return (req, res, next) => {
      if (req.user?.role_id === 2 && req.user?.is_verified !== 1) {
        return res.status(403).json({
          error: "Votre compte n'a pas encore été vérifié par un administrateur.",
        });
      }
      next();
    };
  }
  

module.exports = {userproMiddleware,checkUserProVerified};