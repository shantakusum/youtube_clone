const express = require('express');
const router = express.Router();
console.log("INDEX ROUTE FILE LOADED");
router.use((req, res, next) => {
    console.log("INDEX ROUTER HIT:", req.method, req.originalUrl);
    next();
});

const upload = require('../middleware/upload')
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');
const video = require('../controllers/videos.controller');
const comment = require('../controllers/comment.controller');
const processVideo = require('../controllers/videoProcess.controller')
const categories = require('../controllers/category.controller')
const videoCategory = require('../controllers/video_category.controller')
//const forgetPassword = require('../controllers/forgetPassword.controller')
//users
router.get("/user", user.getUser);
router.get("/user/:UserId", user.getUserById);
router.put("/user/:UserId", user.putUser);
router.delete("/user/:UserId", user.deleteUser);

//auth
router.post("/login", auth.login);
router.post("/register", auth.register);
router.post("/checkEmail", auth.checkEmail);



//forgetPassword
//router.post("/check-email", forgetPassword.checkEmail);
                                             
//videos
router.post("/videos/process", processVideo.processVideo);
//router.post("/videos", video.postVideo);
router.post("/videos/:id", video.postVideoById);
router.get("/videos", video.getVideo);
router.get("/videos/:id", video.getVideoById);
// router.put("/videos/:id", video.putVideo);
// router.delete("/videos/:id", video.deleteVideo);

//comment
router.post("/comments", comment.postComment);
router.put("/comments/:CommentId", comment.putComment);
router.delete("comments/:CommentId", comment.deleteComment);
router.get("/comments/:VideoId", comment.getComment);

//category
router.get("/categories", categories.getCategories);

//video_category
//router.post("/video_category", videoCategory.postVideoCategory);


module.exports = router;