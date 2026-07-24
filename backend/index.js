
const express = require("express");
const cors = require("cors");
const path = require("path")
const videoTusServer = require("./middleware/videoTusServer");
const thumbnailTusServer = require("./middleware/thumbnailTusServer");

const router= require('./routes/index.route');
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.originalUrl);
    next();
});


app.use('/v1', router );


app.use("/upload_video", async (req, res) => {
    await videoTusServer.handle(req, res);
});

app.use("/upload_thumbnail", async (req, res) => {
  await thumbnailTusServer.handle(req, res);
});

app.listen(process.env.PORT || 5000, () => {
    console.log(" server is listening on port 5000");
})