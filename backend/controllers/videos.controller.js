const db = require("../models/index.model");
// Video jo video.module se Video return ho rha hai vo hai db.Video
module.exports = {
    postVideo: async(req, res) => {
        try{
            const{ Title, Description, Video_url, Thumbnail_url, Duration, Category_id } = req.body;
            const video = await db.Video.create( {
                Title,
                Description,
                Video_url,
                Thumbnail_url,
                Duration,
                Category_id
            } );               // database me new record create krta hai ek object return krta hai  
            return res.json(video);
        }catch(err){
            console.log(err);
        }   
    },
    getVideo: async(req, res) => {
        try{
            const video = await db.Video.findAll();
            return res.json(video);
        }
        catch(error){
          return  res.status(500).json(error)
        }
    },
    getVideoById: async(req, res) => {
        try{
            const video = await db.Video.findOne({
                where: {
                    VideoId: req.params.id
                }
            })
            return res.json(video);
        }
        catch(error){
            res.status(500).json(error);
        }
    }

}