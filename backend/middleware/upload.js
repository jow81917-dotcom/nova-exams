const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const url = req.originalUrl.toLowerCase();

  if (url.includes("testimonials") || url.includes("team")) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  else if (url.includes("resources")) {
    if (
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
