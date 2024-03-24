const express = require("express");
const router = express.Router();

router.get("/rooms", function (req, res, next) {
  res.render("rooms");
});

router.get("/", function (req, res, next) {
  const { name, room, theme, showTime, showJoinLeave, showName } = req.query;

  res.render("embed_chat", {
    theme: theme ?? "no-theme",
    config: {
      name: name ?? "",
      room: room ?? "",
    },
    settings: {
      showTime: showTime?? true,
      showJoinLeave: showJoinLeave ?? true,
      showName: showName ?? true,
    },
  });
});

router.get("/embed", function (req, res, next) {
  const { name, room, theme, showTime, showJoinLeave, showName } = req.query;

  res.render("embed_chat", {
    theme: theme ?? "no-theme",
    config: {
      name: name ?? "",
      room: room ?? "",
    },
    settings: {
      showTime: showTime?? true,
      showJoinLeave: showJoinLeave ?? true,
      showName: showName ?? true,
    },
  });
});

module.exports = router;
