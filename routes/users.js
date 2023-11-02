const express = require("express");
const router = express.Router();

const {
  getUser,
  followUser,
  unFollowUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unFollowUser);

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
