const pool = require("../database/db");

const getAllItems = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT i.id_item,i.item, i.description, i.id_category, c.category, r.id_rarity,r.rarity, ip.price ||' '||nc.dim as price FROM n_item i INNER JOIN n_category c ON i.id_category = c.id_category inner join n_rarity r ON r.id_rarity = i.id_rarity inner join item_price ip on i.id_item = ip.id_item inner join n_coin nc on ip.id_coin = nc.id_coin WHERE deleted = false"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT i.id_item,i.item, i.description, i.id_category, c.category, r.id_rarity,r.rarity, ip.price ||' '||nc.dim as price FROM n_item i INNER JOIN n_category c ON i.id_category = c.id_category inner join n_rarity r ON r.id_rarity = i.id_rarity inner join item_price ip on i.id_item = ip.id_item inner join n_coin nc on ip.id_coin = nc.id_coin WHERE deleted = false and id_item=$1",
      [id]
    );
    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
    } else
      res.status(404).json({
        message: "No se tiene información del objeto solicitado...",
      });
  } catch (error) {
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, category, description, detail, rarity } = req.body;

    const result = pool.query(
      "INSERT INTO n_item (name, category, description, detail, rarity) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, category, description, detail, rarity]
    );
    if (result.rows.length !== 0) {
      res.status(200).json({ message: "Se ha creado el objeto correctamente" });
    } else res.status(404).json({ message: "No se pudo crear el objeto..." });
  } catch (error) {
    next(error);
  }
};

const alterItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, description, detail, rarity } = req.body;

    const result = pool.query(
      "UPDATE n_item SET name=$2,id_category = $3, description = $4, detail = $5, id_rarity = $6 WHERE id = $1 RETURNING *",
      [id, name, category, description, detail, rarity]
    );
    if (result.rows.length !== 0) {
      res
        .status(200)
        .json({ message: "Se ha modificado el objeto correctamente" });
    } else
      res.status(404).json({ message: "No se pudo modificar el objeto..." });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = pool.query(
      "UPDATE n_item SET deleted = true WHERE id_item = $1 RETURNING *",
      [id]
    );

    if (result.rows.length !== 0) {
      res
        .status(200)
        .json({ message: "Se ha eliminado el objeto correctamente" });
    } else
      res.status(404).json({ message: "No se pudo eliminar el objeto..." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  alterItem,
  deleteItem,
};
