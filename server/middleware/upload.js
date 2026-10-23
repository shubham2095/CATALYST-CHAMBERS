const multer = require("multer");

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_RESUME_TYPES.includes(file.mimetype)) return cb(null, true);

    const err = new Error("Only PDF and Word documents are allowed.");
    err.status = 400;
    cb(err);
  },
});

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) return cb(null, true);

    const err = new Error("Only JPG, PNG or WebP images are allowed.");
    err.status = 400;
    cb(err);
  },
});

module.exports = { resumeUpload, imageUpload };
