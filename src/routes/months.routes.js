import { Router } from "express";
import { getMonths } from "../controllers/months.controller.js";
const router = Router();

const verificarAutenticacion = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.status(401).json({ mensaje: "No autorizado" });
};

router.get("/meses", verificarAutenticacion, getMonths);

export default router;
