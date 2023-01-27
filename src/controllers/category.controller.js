const pool = require("../database/db");
const { Pool } = require("../database/db");

const getAllcategories = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM n_category WHERE deleted = false"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM n_category WHERE id_category = $1 and deleted = false",
      [id]
    );
    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
    } else
      res.status(404).json({
        message: "La categoría no existe...",
      });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const result = await pool.query(
      "INSERT INTO public.n_category(category) VALUES ($1) RETURNING *",
      [category]
    );

    if (result.rows.length !== 0) {
      res.status(200).json({ message: "Categoría creada" });
    } else
      res.status(404).json({
        message: "ocurrió un error durante la creación de La categoría...",
      });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE public.n_category SET category=$1  WHERE id_category = $2 RETURNING *",
      [category, id]
    );

    if (result.rows.length !== 0) {
      res.status(200).json({ message: "Categoría modificada" });
    } else
      res.status(404).json({ message: "No se pudo modificar La categoría..." });
  } catch (error) {
    nest(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE public.n_category SET deleted=true  WHERE id_category = $1 RETURNING * ",
      [id]
    );

    if (result.rows.length !== 0) {
      res
        .status(200)
        .json({ message: "La categoría se ha eliminado correctamente" });
    } else
      res
        .state(404)
        .json({ message: "La categoría seleccionado no existe..." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategory,
  getAllcategories,
  createCategory,
  updateCategory,
  deleteCategory
};
