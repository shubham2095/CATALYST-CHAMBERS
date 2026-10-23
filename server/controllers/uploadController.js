const uploadService = require("../services/uploadService");

function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Please choose an image to upload." });
  }

  res.json({ url: uploadService.saveImage(req.file.buffer) });
}

module.exports = { uploadImage };
