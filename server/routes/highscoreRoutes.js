const express = require("express");
const router = express.Router();
const {
  getHighScores,
  postHighScores,
} = require("../controllers/highscoreController");

router.get("/", getHighScores);

router.post("/", postHighScores);

module.exports = router;
