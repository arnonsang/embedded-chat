const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  const { name, room, theme } = req.query;
  res.render("index", {
    config: {
      name: name ?? "",
      room: room ?? "",
    },
    theme: theme ?? "no-theme",
  });
});

module.exports = router;
