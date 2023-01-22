const asyncHandler = require("express-async-handler");

// @desc get HighScores
// @route GET /api/highscores
const getHighScores = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "yo" });
});

// @desc get HighScores
// @route GET /api/highscores
const postHighScores = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "post highscore" });
});

module.exports = {
  getHighScores,
  postHighScores,
};
