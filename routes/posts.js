const express = require("express");
const router = express.Router();
const { 
    createPost,
    likePost,
    deletePost,
    updatePost,
    getPost,
    getTimeline
 } = require('../controllers/posts');

router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost );

router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/all", getTimeline);


module.exports = router;
