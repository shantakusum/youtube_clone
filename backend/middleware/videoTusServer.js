const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const videoTusServer = new Server({
  path: "/upload_video",
  datastore: new FileStore({
    directory: "./public/videos",
  }),
});



module.exports = videoTusServer;