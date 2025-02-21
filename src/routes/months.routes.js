import { Router } from "express";
import { getMonths } from "../controllers/months.controller.js";
const router = Router();

router.get("/meses", getMonths);

export default router;
