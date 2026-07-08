const db = require("../models/index.model");

module.exports ={
    postComment: async(req, res) => {
        try{
            const { VideoId, UserId, ParentCommentId, Comment} = req.body;
            const comment = await db.Comment.create({
                VideoId,
                UserId,
                ParentCommentId: ParentCommentId ?? null,                            // parentcommentid me agar undefined aaye to parentcommentid ki value null print hogi
                Comment
            })
            return res.json({
                message: "Comment Added Successfully",
                comment
            })
        }
        catch(error){
          return  res.status(500).json(error)
        }
    },
    getComment: async(req, res) =>{
        try{
            const getComment = await db.Comment.findAll({
                where: {
                    VideoId: req.params.VideoId,
                    ParentCommentId: null
                },
                include : [
                    {
                        model: db.Comment,
                        as: 'Replies',
                    },
                    // {
                    //     model: db.User,
                    //     attributes : ['UserId','UserName']
                    // }
                ]
            })
            return res.json({
                message: "success",
                Comments : getComment
            } )
        }
        catch(error){
            res.status(500).json(error)
        }

    },
    getCommentById: async(req, res) => {

    },
    putComment: async(req, res) => {
        try{
            const comments = await db.Comment.update(req.body, {
                where: {
                    CommentId : req.params.CommentId
                }
            })
            res.json({
                message: "comment update successfully",
                comments
            })
        }
        catch(error){
            res.status(500).json(error);
        }
    },
    deleteComment: async(req, res) => {
        try{
            await db.Comment.destroy({
                where: {
                    CommentId : req.params.CommentId
                }
            })
            res.json({
                message: "comment deleted successfully",
            })
        }
        catch(error){
            res.status(500).json(error)
        }
    }

}