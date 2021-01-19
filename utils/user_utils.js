const User = require("../models/user");

// Returns the user from the request received.
const getUserById = (req) => {
  return User.findById(req.params.userId);
};

// Allows the user to add a child.
const addChild = async (req) => {
  const userId = req.params.userId;
  let user = await User.findById(userId);

  // Creates a child based on the request received.
  let child = {
    name: req.body.name,
    age: req.body.age,
    childUid: req.body.childUid,
  };

  user.children.push(child);

  // Updates user with child.
  return User.findByIdAndUpdate(user._id, user, {
    new: true,
  });
};

module.exports = {
  getUserById,
  addChild,
};
