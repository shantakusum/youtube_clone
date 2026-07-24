const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const thumbnailTusServer = new Server({
  path: "/upload_thumbnail",
  datastore: new FileStore({
    directory: "./public/thumbnail",
  }),
});

module.exports = thumbnailTusServer;