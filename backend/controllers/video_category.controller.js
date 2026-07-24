const db = require("../models/index.model");

// Video jo video.module se Video return ho rha hai vo hai db.Video
module.exports = {
    postVideoCategory: async(req, res) => {
      
        try {
               const {Category_Name} = req.body;

                const video = await db.Video.create({Category_Name });

                return res.status(201).json({
                    message: "Video Uploaded Successfully",
                    video
                });

            } catch (err) {
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            } 
    }
}   