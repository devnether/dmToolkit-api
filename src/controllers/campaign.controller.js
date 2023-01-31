const pool = require("../database/db");

const getCampaigns = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM n_campaign WHERE deleted = false"
    );

    if (result.rows.length !== 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({
        message: "No existe ninguna campaña registrada en el sistema...",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM n_campaign WHERE deleted = false AND id_campaign = $1",
      [id]
    );

    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({
        message: "No existe ninguna campaña registrada en el sistema...",
      });
    }
  } catch (error) {
    next(error);
  }
};

const insertCampaign = async (req, res, next) => {
  try {
    const { campaign, description } = req.body;
    const result = await pool.query(
      "INSERT INTO public.n_campaign(campaign, description)VALUES ($1,$2) RETURNING * ",
      [campaign, description]
    );

    if (result.rows.length !== 0) {
      res.status(200).json({ message: "La campaña ha sido creada" });
    } else {
      res.status(404).json({ message: "Error al crear la campaña..." });
    }
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { campaign, description } = req.body;
    const result = await pool.query(
      "UPDATE public.n_campaign SET campaign=$1, description=$2 WHERE id_campaign =$3 AND deleted = false RETURNING * ",
      [campaign, description, id]
    );

    if (result.rows.length !== 0) {
      res.status(200).json({ message: "La campaña ha sido modificada" });
    } else {
      res.status(404).json({ message: "Error al modificar la campaña..." });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE public.n_campaign SET deleted = true WHERE id_campaign =$1 AND deleted = false RETURNING * ",
      [id]
    );

    if (result.rows.length !== 0) {
      res.status(200).json({ message: "La campaña ha sido eliminada" });
    } else {
      res.status(404).json({ message: "Error al eliminar la campaña..." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCampaign,
  getCampaigns,
  insertCampaign,
  updateCampaign,
  deleteCampaign,
};
