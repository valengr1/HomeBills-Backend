import { Router } from "express";
import {
  getCategorias,
  getRegistros,
  getRegistrosByIdaño_mes,
  getTiposRegistro,
} from "../controllers/registros.controller.js";
import { verificarAutenticacion } from "../middlewares/loginmiddleware.js";

const router = Router();

router.get("/registros/categorias", verificarAutenticacion, getCategorias);
router.get("/registros/tipos", verificarAutenticacion, getTiposRegistro);
router.get("/registros", verificarAutenticacion, getRegistros);
//añadir una ruta que busque los registros por el idaño_mes en el path de la ruta
router.get("/registros/:id", verificarAutenticacion, getRegistrosByIdaño_mes);

export default router;
