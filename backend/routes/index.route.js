const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');
const video = require('../controllers/videos.controller');
const comment = require('../controllers/comment.controller');

//users
router.get("/user", user.getUser);
router.get("/user/:UserId", user.getUserById);
router.put("/user/:UserId", user.putUser);
router.delete("/user/:UserId", user.deleteUser);

//auth
router.post("/login", auth.login);
router.post("/register", auth.register);
                                             
//videos
router.post("/videos", video.postVideo);
router.get("/videos", video.getVideo);
router.get("/videos/:id", video.getVideoById);
// router.put("/videos/:id", video.putVideo);
// router.delete("/videos/:id", video.deleteVideo);

//comment
router.post("/comments", comment.postComment);
router.put("/comments/:CommentId", comment.putComment);
router.delete("comments/:CommentId", comment.deleteComment);
router.get("/comments/:VideoId", comment.getComment);



module.exports = router;