const express = require("express");
const router = express.Router();
const moment = require("moment");

router.get("/get", (req, res) => {
  return res.render("history");
});

router.post("/post", async (req, res) => {
  const { Startdate, Enddate } = req.body;

  var Startday = await moment(Startdate, "YYYY-MM-DDThh:mm:ss").format(
    "YYYY-MM-DDTHH:mm:ss.000z"
  );
  var Endday = await moment(Enddate, "YYYY-MM-DDThh:mm:ss").format(
    "YYYY-MM-DDTHH:mm:ss.000z"
  );
  res.redirect(`/get/${Startday}Z/${Endday}Z`);
});

module.exports = router;
