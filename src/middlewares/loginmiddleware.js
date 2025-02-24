export const verificarAutenticacion = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.status(401).json({ mensaje: "No autorizado" });
};
