import { pool } from "./../db.js";

export const getMonths = async (req, res) => {
  try {
    // Obtener el mes actual (1-12)
    const mesActual = new Date().getMonth() + 1;

    // Formatear el nombre del mes con la primera letra en mayúscula
    const mesActualNombre = new Intl.DateTimeFormat("es-ES", { month: "long" })
      .format(new Date())
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitaliza la primera letra

    console.log("Mes actual:", mesActual, mesActualNombre);

    // Obtener los meses existentes en la BD para el año 2025
    const [meses] = await pool.query(
      `SELECT meses.idmes, meses.descripcion 
       FROM año_mes 
       INNER JOIN meses ON año_mes.idmes = meses.idmes 
       WHERE numeroaño = 2025;`
    );

    // Verificar si el mes actual ya está en la BD
    const existeMes = meses.some((mes) => mes.idmes === mesActual);

    if (!existeMes) {
      console.log(`Insertando mes ${mesActualNombre} en la BD...`);

      await pool.query(
        `INSERT INTO año_mes (numeroaño, idmes) VALUES (2025, ?);`,
        [mesActual]
      );

      // Agregar el nuevo mes a la lista
      meses.push({ idmes: mesActual, descripcion: mesActualNombre });
    }

    // Enviar la lista de meses en el JSON
    res.json(meses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los meses" });
  }
};
