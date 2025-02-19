import { Router } from "express";
import { getMonths } from "../controllers/months.controller.js";
const router = Router();

router.get("/months", getMonths);

export default router;
