const db = require("../models/index.model");
const { spawn } = require("child_process");
const fs = require("fs");

const path = require("path");
// Video jo video.module se Video return ho rha hai vo hai db.Video
//console.log("videoProcess.controller.js LOADED");
module.exports = {


processVideo: async (req, res) => {
    console.log("========== PROCESS VIDEO API CALLED ==========");
    try {
        const {
            videoUploadId,
            thumbnailUploadId,
            Title,
            Description,
            VideoCategory
        } = req.body;

        // Tus uploaded file
        const inputPath = path.join(
            __dirname,
            "../public/videos",
            videoUploadId
        ); 

        // Check file exists
        if (!fs.existsSync(inputPath)) {
            return res.status(404).json({
                success: false,
                message: "Uploaded video not found."
            });
        }

        // Processed file name
        
        const outputFolder = path.join(
            __dirname,
            "../public/hls",
            videoUploadId
        );

        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }
        // fs.mkdirSync(path.join(outputFolder, "v0"), { recursive: true });
        // fs.mkdirSync(path.join(outputFolder, "v1"), { recursive: true });
        // fs.mkdirSync(path.join(outputFolder, "v2"), { recursive: true });
        // fs.mkdirSync(path.join(outputFolder, "v3"), { recursive: true });

        // const playlistPath = path.join(outputFolder, "v%v", "index.m3u8").replace(/\\/g, "/");
        // const segmentPath = path.join(outputFolder, "v%v", "segment_%03d.ts").replace(/\\/g, "/");
        const args = [
            "-i", inputPath,
            '-filter_complex', '[0:v]split=5[v1][v2][v3][v4][v5];[v1]scale=1920:1080[v1080];[v2]scale=1280:720[v720];[v3]scale=854:480[v480];[v4]scale=640:360[v360];[v5]scale=256:144[v144]',
            '-map', '[v1080]', '-map', '[v720]', '-map', '[v480]', '-map', '[v360]', '-map', '[v144]',
            '-map', '0:a', '-map', '0:a', '-map', '0:a', '-map', '0:a', '-map', '0:a',
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-hls_time', '6',
            '-hls_playlist_type', 'vod',
            '-var_stream_map', 'v:0,a:0,name:1080p v:1,a:1,name:720p v:2,a:2,name:480p v:3,a:3,name:360p v:4,a:4,name:144p',
            '-master_pl_name', 'master.m3u8',
            '%v/stream.m3u8'
        ];

           
            const ffmpegProcess = spawn("ffmpeg", args, { cwd : outputFolder });
            ffmpegProcess.stderr.on("data", (data) => {
                console.log("FFmpeg ERROR:", data.toString());
            });
            ffmpegProcess.on("close", async (code) => {
                console.log("FFmpeg Exit Code:", code);
            if (code !== 0) {
                console.log("FFMPEG FAILED")
                return res.status(500).json({
                    success: false,
                    message: "FFmpeg Failed"
                });
            }
            console.log("FFMPEG SUCCESS");
            const videoUrl =
                `http://localhost:5000/hls/${videoUploadId}/master.m3u8`;

            const thumbnailUrl =
                `http://localhost:5000/upload_thumbnail/${thumbnailUploadId}`;

            const video = await db.Video.create({
                Title,
                Description,
                VideoType: "vod",
                Video_url: videoUrl,
                Thumbnail_url: thumbnailUrl,
                Duration: 0,
                Views: 0
            });
            const data = VideoCategory.map(el=>({
                VideoId: video.VideoId,
                CategoryId: el
            }));
            if(data.length > 0){
                await db.VideoCategory.bulkCreate(data); 
            }
            console.log("ALL DONE");
            return res.status(201).json({
                success: true,
                message: "Video Uploaded Successfully"
            });

        });
        ffmpegProcess.on("error", (err) => {
            console.error("Spawn Error:", err);
        });

        } catch (err) {
            console.error("DATABASE ERROR:", err);
            return res.status(500).json({
                success: false,
                message: err.message,
                err: err
            });
        }
    }
}