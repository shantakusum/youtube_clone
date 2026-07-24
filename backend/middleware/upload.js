const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.fieldname === "Thumbnail_url") {
            cb(null, "public/thumbnail");
        } else if (file.fieldname === "Video_url") {
            cb(null, "public/videos");
        } else {
             cb(new Error("Invalid file field"), false);
         }
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage });

module.exports = upload;