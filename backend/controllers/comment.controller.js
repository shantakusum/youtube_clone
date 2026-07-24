const db = require("../models/index.model");
const { buildYoutubeStyleTree } = require('../helpers/util.helper');

module.exports ={
    postComment: async(req, res) => {
        try{    
            const { VideoId, UserId, UserName, ParentCommentId, Comment} = req.body;
            console.log(req.body);
            const comment = await db.Comment.create({
                VideoId,
                UserId,
                UserName,
                ParentCommentId: ParentCommentId ?? null,                            // parentcommentid me agar undefined aaye to parentcommentid ki value null print hogi
                Comment
                
            })
            return res.json({
                message: "Comment Added Successfully",
                comment
            })
        }
        catch(error){
          return  res.status(500).json({
            message: error.message
          })
        }
    },
    getComment: async(req, res) =>{
        try{
            const [comments,metadata] = await db.sequelize.query(`WITH RECURSIVE comment_tree AS (
                    -- Step 1: Fetch and paginate the root level 1 items
                    ( SELECT a.CommentId,a.ParentCommentId, a.UserId, a.UserName, a.Comment, a.Likes, a.Dislikes, a.CreatedAt,
                    a.CommentId AS root_id,                     -- Anchor the entire thread lineage
                        CAST(NULL AS char(10000)) AS reply_to_user_id,          -- Root comments tag nobody
                        1 AS current_depth
                    FROM ecommerce.Comments a
                    WHERE a.VideoId = '${req.params.VideoId}' AND a.ParentCommentId IS NULL ORDER BY a.CreatedAt DESC LIMIT 10 )    

                    UNION ALL

                    -- Step 2: Recursively fetch child items but caps depth logical grouping
                    SELECT
                        c.CommentId, c.ParentCommentId, c.UserId, c.UserName, c.Comment, c.Likes, c.Dislikes, c.CreatedAt,
                        ct.root_id,                        -- Inherit the root anchor
                        ct.UserId AS reply_to_user_id,    -- Capture the user ID being replied to
                        CASE 
                            WHEN ct.current_depth < 3 THEN ct.current_depth + 1 
                            ELSE 3 
                        END AS current_depth               -- Cap structural UI indentation at depth level 3
                    FROM ecommerce.Comments c
                    INNER JOIN comment_tree ct ON c.ParentCommentId = ct.CommentId
                )
                SELECT CommentId, ParentCommentId, UserId, reply_to_user_id, Comment,UserName,Likes,Dislikes, CreatedAt, current_depth, root_id
                FROM comment_tree
                ORDER BY current_depth ASC, CreatedAt DESC;
                `);
            const getComment = buildYoutubeStyleTree(comments)
            // const getComment = await db.Comment.findAll({
            //     where: {
            //         VideoId: req.params.VideoId,
            //         ParentCommentId: null
            //     },
            //     include : [
            //         {
            //             model: db.Comment,
            //             as: 'Replies',
            //         },
            //         // {
            //         //     model: db.User,
            //         //     attributes : ['UserId','UserName']
            //         // }
            //     ]
            // })
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