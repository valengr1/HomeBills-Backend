import { pool } from "./../db.js";

export const getCategorias = async (req, res) => {
  try {
    const categorias = await pool.query("SELECT * FROM categoria");
    res.json(categorias[0]);
  } catch (error) {
    console.error(error.message);
  }
};

export const getTiposRegistro = async (req, res) => {
  try {
    const tipos = await pool.query("SELECT * FROM tiporegistro");
    res.json(tipos[0]);
  } catch (error) {
    console.error(error.message);
  }
};

export const getRegistros = async (req, res) => {
  try {
    const registros = await pool.query(
      "select registros.idregistro, categoria.descripcion as categoria, registros.descripcion, registros.monto, registros.fecha, tiporegistro.descripcion as tiporegistro from registros inner join tiporegistro on registros.idtiporegistro = tiporegistro.idtipoRegistro inner join categoria on registros.idcategoria = categoria.idcategoria"
    );
    //formatear la fecha y la hora para que sean legibles y la hora en formato 16:30pm o 3:30am
    registros[0].map((registro) => {
      let fecha = new Date(registro.fecha);
      let hora = fecha.getHours();
      let minutos = fecha.getMinutes();
      let ampm = hora >= 12 ? "pm" : "am";
      hora = hora % 12;
      hora = hora ? hora : 12; // the hour '0' should be '12'
      minutos = minutos < 10 ? "0" + minutos : minutos;
      registro.fecha = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()} ${hora}:${minutos} ${ampm}`;
    });
    res.json(registros[0]);
  } catch (error) {
    console.error(error.message);
  }
};

export const getRegistrosByIdaño_mes = async (req, res) => {
  try {
    const { id } = req.params;

    const registros = await pool.query(
      "select registros.idregistro, categoria.descripcion as categoria, registros.descripcion, registros.monto, registros.fecha, tiporegistro.descripcion as tiporegistro from registros inner join tiporegistro on registros.idtiporegistro = tiporegistro.idtipoRegistro inner join categoria on registros.idcategoria = categoria.idcategoria where registros.idaño_mes = ?",
      [id]
    );

    //formatear la fecha y la hora para que sean legibles y la hora en formato 16:30pm o 3:30am
    registros[0].map((registro) => {
      let fecha = new Date(registro.fecha);
      let hora = fecha.getHours();
      let minutos = fecha.getMinutes();
      let ampm = hora >= 12 ? "pm" : "am";
      hora = hora % 12;
      hora = hora ? hora : 12; // the hour '0' should be '12'
      minutos = minutos < 10 ? "0" + minutos : minutos;
      registro.fecha = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()} ${hora}:${minutos} ${ampm}`;
    });
    res.json(registros[0]);
  } catch (error) {
    console.error(error.message);
  }
};
