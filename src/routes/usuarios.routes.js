import { Router } from "express";
import {
  validarUsuario,
  crearUsuario,
  cerrarSesion,
} from "../controllers/usuarios.controller.js";
import { verificarAutenticacion } from "../middlewares/loginmiddleware.js";

//crear una instancia de Router
const router = Router();

router.post("/usuarios/login", validarUsuario);
router.post("/usuarios/crear", crearUsuario);
router.post("/usuarios/logout", verificarAutenticacion, cerrarSesion);

export default router;
