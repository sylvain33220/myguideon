// NE PAS MODIFIER CE FICHIER FICHIER DE TEST 
/**
 * @file Logger.js
 * @description  Middleware pour les logs
 * @module  Middleware Logger
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */
module.exports = function logMiddleware(req, res, next) {
    console.log("🪵 [Logger] Méthode:", req.method);
    console.log("➡️ URL:", req.originalUrl);
    console.log("📦 Body:", req.body);
    console.log("🧑‍💻 User:", req.user);
    console.log("🧭 Params:", req.params);
    next();
  };