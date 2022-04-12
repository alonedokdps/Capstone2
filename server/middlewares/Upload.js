/* eslint-disable no-console */
/* eslint-disable no-constant-condition */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (file.mimeType == "image/png" || "image/jpg") {
      cb(null, true);
    } else {
      console.log("only accept file JPG && PNG");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = upload;
