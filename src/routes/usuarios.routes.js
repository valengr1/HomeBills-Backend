import { Router } from "express";
import {
  validarUsuario,
  crearUsuario,
} from "../controllers/usuarios.controller.js";

//crear una instancia de Router
const router = Router();
//crear una ruta que reciba un body
router.post("/usuarios/validar", validarUsuario);
router.post("/usuarios/crear", crearUsuario);

export default router;
