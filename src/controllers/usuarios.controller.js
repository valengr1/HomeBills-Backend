import { pool } from "./../db.js";
import bcrypt from "bcryptjs";

export const validarUsuario = async (req, res) => {
  console.log("Body recibido:", req.body);

  if (!req.body) {
    return res
      .status(400)
      .json({ mensaje: "El cuerpo de la petición está vacío" });
  }

  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: "Faltan datos del usuario" });
  }

  try {
    // Obtener el usuario de la base de datos
    const [results] = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (results.length === 0) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    const usuarioDB = results[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const contraseñaValida = bcrypt.compareSync(
      contraseña,
      usuarioDB.contraseña
    );

    if (!contraseñaValida) {
      return res
        .status(401)
        .json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json({ mensaje: "Usuario autenticado" });
  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ mensaje: "Error en la base de datos" });
  }
};

export const crearUsuario = async (req, res) => {
  console.log("Body recibido:", req.body);

  if (!req.body) {
    return res
      .status(400)
      .json({ mensaje: "El cuerpo de la petición está vacío" });
  }

  const { nombre, apellido, usuario, contraseña, correo } = req.body;

  if (!usuario || !contraseña || !nombre || !apellido || !correo) {
    return res.status(400).json({ mensaje: "Faltan datos del usuario" });
  }

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  const contraseña_encriptada = bcrypt.hashSync(contraseña, salt);

  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, usuario, contraseña, correo) VALUES (?, ?,?,?,?)",
      [nombre, apellido, usuario, contraseña_encriptada, correo]
    );

    res.status(200).json({ mensaje: "Usuario creado" });
  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ mensaje: "Error en la base de datos" });
  }
};
