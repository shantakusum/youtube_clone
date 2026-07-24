const db = require("../models/index.model");

// Video jo video.module se Video return ho rha hai vo hai db.Video
module.exports = {
    // postVideo ki place pe videoProcess.controller se video post ki ja rahi
    // postVideo: async(req, res) => {
      
    //     try {
    //            const {
    //                 Title,
    //                 Description,l
    //                 Video_url,
    //                 Thumbnail_url,
    //                 Category_Id,
    //                 Duration,
    //                 VideoType
    //             } = req.body;

    //             const video = await db.Video.create({
    //                 Title,
    //                 Description,
    //                 Video_url,
    //                 Thumbnail_url,
    //                 Category_Id,
    //                 Duration,
    //                 VideoType
    //             });

    //             return res.status(201).json({
    //                 message: "Video Uploaded Successfully",
    //                 video
    //             });

    //         } catch (err) {
    //             console.log(err);

    //             return res.status(500).json({
    //                 message: err.message
    //             });
    //         } 
    // },
    postVideoById: async(req, res) => {           // ye code videoprocess.controller se videos table me video  upload hone k baad kisi pertculler video pe cick krne pe us video k views increise krta hai.
        try{
            const video = await db.Video.findOne({
                where: {
                    VideoId: req.params.id
                }
            })
            await video.increment("Views", {
                by: 1
            });
            // Updated value database se reload
            await video.reload();
            return res.json(video);
         }   
        catch(error){
            res.status(500).json(error);
        }
    },
    getVideo: async(req, res) => {                       // this code is use for( Har video ke saath uski related categories nikalna. )  // frontend me playVideoCard?.Categories.map(...)
        try{                                             //ye API saare videos ko unki respective categories ke saath fetch kar rahi hai.
            const video = await db.Video.findAll({       //Videos table se saare videos nikalo.
                include : {                              //Video ke saath uski related Category bhi
                    model : db.Category,
                    attributes:['CategoryId','Category_Name'],                  //Category table se mujhe sirf ye 2 columns chahiye  CategoryId, Category_Name
                    through: {                                          //through means Beech ki junction table (videoCategory) ko relationship ke liye use karo.
                        attributes:[]                                   //means Junction table(videoCategory) ke columns response me mat bhejo.
                    }
                },
                order: [
                    ["CreatedAt", "DESC"]
                ]
            });
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


// through: {
//     attributes: []
// }  na lagane pe categories k andar ka data aishe aayega

// Categories: [
//     {
//         CategoryId: "A",
//         Category_Name: "React",
//         VideoCategory: {
//             VideoId: "1",
//             CategoryId: "A"
//         }
//     }
// ]