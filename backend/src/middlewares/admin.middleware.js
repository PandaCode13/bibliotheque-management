module.exports = (req, res, next) => {
  console.log("🔍 ADMIN MIDDLEWARE:", {
    hasUser: !!req.user,
    userRole: req.user?.role,
    userId: req.user?.id,
    email: req.user?.email,
  });

  if (!req.user) {
    return res.status(403).json({ message: "❌ Utilisateur pas trouvé dans req.user" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: `❌ Accès admin requis. Vous êtes: ${req.user.role}` 
    });
  }

  next();
};
