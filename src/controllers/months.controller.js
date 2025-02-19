import { pool } from "./../db.js";

export const getMonths = async (req, res) => {
  const months = await pool.query("select * from months");
  res.json(months[0]);
};
