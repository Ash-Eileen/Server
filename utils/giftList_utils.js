const User = require("../models/user");
const GiftList = require("../models/giftList");

// Finds a giftlist based on the userId provided.
const getGiftListById = (req) => {
  return GiftList.find({ user: req.params.userId });
};

// Creates a new giftlist for the user.
const addGiftList = async (req) => {
  const userId = req.params.userId;
  let user = await User.findById(userId).populate("GiftList");

  // Creates a list based on the in the request received and saves it.
  let giftList = new GiftList({
    gifts: req.body.gifts || "",
    user: user.id,
    receiver: req.body.receiver,
    uid: req.body.uid,
  });
  giftList.save();

  return giftList;
};

// Updates the giftlist for the user.
const updateGiftList = (req) => {
  return GiftList.findOneAndUpdate(
    { user: req.params.userId, uid: req.body.uid },
    req.body,
    {
      new: true,
    }
  );
};

// Deletes the requested list.
const deleteGiftList = (req) => {
  return GiftList.deleteOne({
    user: req.params.userId,
    uid: req.params.uid,
  });
};

module.exports = {
  getGiftListById,
  addGiftList,
  updateGiftList,
  deleteGiftList,
};
