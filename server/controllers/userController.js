const { ModuleResolutionKind } = require("typescript");

const postUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: "name" });
  throw new Error("Please add a text field");
});

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ users: "name" });
});

module.exports = {
  postUser,
  getUsers,
};
