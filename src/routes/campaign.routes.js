const { Router } = require("express");
const {
  getCampaign,
  getCampaigns,
  insertCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaign.controller");

const router = Router();

router.get("/", getCampaigns);
router.get("/:id", getCampaign);
router.put("/", insertCampaign);
router.post("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

module.exports = router;
