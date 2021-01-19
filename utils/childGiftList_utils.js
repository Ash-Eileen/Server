const User = require("../models/user");
const GiftList = require("../models/giftList");

// Returns a giftlist for the child.
const getChildGiftListById = (req) => {
  return GiftList.find({ childUid: req.params.childUid });
};

// Adds a giftlist for the child.
const addChildGiftList = async (req) => {
  const childUid = req.params.childUid;

  // Creates new list and adds the information from the request and then saves.
  let giftList = new GiftList({
    gifts: req.body.gifts || "",
    childUid: req.params.childUid,
    receiver: req.body.receiver,
    uid: req.body.uid,
  });
  giftList.save();

  return giftList;
};

// Updates the childs giftlist.
const updateChildGiftList = (req) => {
  return GiftList.findOneAndUpdate(
    { childUid: req.params.childUid, uid: req.body.uid },
    req.body,
    {
      new: true,
    }
  );
};

// Deletes the childs giftlist.
const deleteChildGiftList = (req) => {
  return GiftList.deleteOne({
    childUid: req.params.childUid,
    uid: req.params.uid,
  });
};

module.exports = {
  getChildGiftListById,
  addChildGiftList,
  updateChildGiftList,
  deleteChildGiftList,
};
