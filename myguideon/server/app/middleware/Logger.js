module.exports = function logMiddleware(req, res, next) {
    console.log("🪵 [Logger] Méthode:", req.method);
    console.log("➡️ URL:", req.originalUrl);
    console.log("📦 Body:", req.body);
    console.log("🧑‍💻 User:", req.user);
    console.log("🧭 Params:", req.params);
    next();
  };