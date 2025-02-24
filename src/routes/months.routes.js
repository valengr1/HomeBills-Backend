import { Router } from "express";
import { getMonths } from "../controllers/months.controller.js";
import { verificarAutenticacion } from "../middlewares/loginmiddleware.js";
const router = Router();

router.get("/meses", verificarAutenticacion, getMonths);

export default router;
