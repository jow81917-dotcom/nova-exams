const cloudinary = require("../lib/cloudinary");
const path = require("path");

const uploadToCloudinary = (fileBuffer, mimetype, folder, originalName = "file") => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(originalName) || "";
    const baseName = path.basename(originalName, ext).replace(/\s+/g, "_");

    const resourceType =
      mimetype.startsWith("video/") ? "video" :
      mimetype.startsWith("image/") ? "image" :
      "raw";

    let format;
    if (mimetype === "application/pdf") {
      format = "pdf";
    } else if (ext) {
      format = ext.replace(".", "");
    }

    const uploadOptions = {
      folder,
      public_id: baseName,        
      resource_type: resourceType,
      format,                     
      overwrite: true,
      access_mode: "public",     
    };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        reject(error);
      } else {
        console.log("Cloudinary upload result:", result);
        resolve(result); 
      }
    });

    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
