import { Router } from "express";
import {
  getCategorias,
  getRegistros,
  getRegistrosByIdaño_mes,
  getTiposRegistro,
} from "../controllers/registros.controller.js";

const router = Router();

router.get("/registros/categorias", getCategorias);
router.get("/registros/tipos", getTiposRegistro);
router.get("/registros", getRegistros);
//añadir una ruta que busque los registros por el idaño_mes en el path de la ruta
router.get("/registros/:id", getRegistrosByIdaño_mes);

export default router;
