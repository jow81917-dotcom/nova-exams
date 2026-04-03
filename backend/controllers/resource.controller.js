const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("../lib/cloudinary");

exports.createResource = async (req, res) => {
  try {
    const { type, title, description, pdfUploadMode, videoType, sourceUrl } = req.body;

    if (!type || !title) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: type, title, description",
      });
    }

    let finalSourceUrl = sourceUrl || null;
    let sourceType = "url";
    let publicId = null;

    if (type === "pdf" && req.files?.pdfFile?.[0]) {
      const file = req.files.pdfFile[0];
      console.log("PDF file received:", file);
      const uploadResult = await uploadToCloudinary(
        file.buffer,
        file.mimetype,
        "lib/pdf",
        file.originalname
      );
      finalSourceUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
      sourceType = "upload";
    }

    if (type === "video") {
      if (videoType === "youtube" && sourceUrl) {
        finalSourceUrl = sourceUrl;
        sourceType = "url";
        publicId = null;
      } else if (req.files?.videoFile?.[0]) {
        const file = req.files.videoFile[0];
        console.log("Video file received:", file);
        const uploadResult = await uploadToCloudinary(
          file.buffer,
          file.mimetype,
          "lib/video",
          file.originalname
        );
        finalSourceUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
        sourceType = "upload";
        console.log("Cloudinary public_id:", publicId);
      }
    }

    const resource = await prisma.resource.create({
      data: {
        type,
        title,
        description,
        sourceType,
        sourceUrl: finalSourceUrl,
        publicId,
        pdfUploadMode: type === "pdf" ? pdfUploadMode || "url" : null,
        videoType: type === "video" ? videoType || "youtube" : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: resource,
    });
  } catch (error) {
    console.error("Create resource error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create resource",
      error: error.message,
    });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const { type, title, description, pdfUploadMode, videoType, sourceUrl } = req.body;

    const updateData = {};
    if (type) updateData.type = type;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (pdfUploadMode && type === "pdf") updateData.pdfUploadMode = pdfUploadMode;
    if (videoType && type === "video") updateData.videoType = videoType;

    if (sourceUrl) {
      updateData.sourceUrl = sourceUrl;
      updateData.sourceType = "url";
    }

    if (type === "pdf" && req.files?.pdfFile?.[0]) {
      const file = req.files.pdfFile[0];
      console.log("PDF file received (update):", file);
      const uploadResult = await uploadToCloudinary(
        file.buffer,
        file.mimetype,
        "lib/pdf",
        file.originalname
      );
      updateData.sourceUrl = uploadResult.secure_url;
      updateData.publicId = uploadResult.public_id;
      updateData.sourceType = "upload";
    }

    if (type === "video") {
      if (videoType === "youtube" && sourceUrl) {
        updateData.sourceUrl = sourceUrl;
        updateData.sourceType = "url";
        updateData.publicId = null;
      } else if (req.files?.videoFile?.[0]) {
        const file = req.files.videoFile[0];
        console.log("Video file received (update):", file);
        const uploadResult = await uploadToCloudinary(
          file.buffer,
          file.mimetype,
          "lib/video",
          file.originalname
        );
        updateData.sourceUrl = uploadResult.secure_url;
        updateData.publicId = uploadResult.public_id;
        updateData.sourceType = "upload";
      }
    }

    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Resource updated successfully",
      data: resource,
    });
  } catch (error) {
    console.error("Update resource error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({
      success: true,
      message: "Resources fetched successfully",
      data: resources,
    });
  } catch (error) {
    console.error("Get resources error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
      error: error.message,
    });
  }
};

exports.downloadResource = async (req, res) => {
  try {
    const resource = await prisma.resource.findUnique({ where: { id: req.params.id } });
    if (!resource) return res.status(404).send("Not found");

    if (!resource.publicId) {
      return res.status(400).send("Resource missing publicId");
    }

    const cleanPublicId = resource.publicId.replace(/\.pdf$/, "");

    const downloadUrl = cloudinary.url(cleanPublicId, {
      resource_type: resource.type === "video" ? "video" : "raw",
      type: "upload",
      flags: "attachment",
      format: resource.type === "pdf" ? "pdf" : undefined,
      sign_url: true,
    });

    res.redirect(downloadUrl);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getResource = async (req, res) => {
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: req.params.id },
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      message: "Resource fetched successfully",
      data: resource,
    });
  } catch (error) {
    console.error("Get resource error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resource",
      error: error.message,
    });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await prisma.resource.findUnique({ where: { id: req.params.id } });
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (resource.publicId) {
      try {
        await cloudinary.uploader.destroy(resource.publicId, {
          resource_type: resource.type === "video" ? "video" : "raw",
        });
        console.log("Deleted from Cloudinary:", resource.publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err);
      }
    }

    await prisma.resource.delete({ where: { id: req.params.id } });

    res.json({
      success: true,
      message: "Resource deleted successfully (DB + Cloudinary)",
    });
  } catch (error) {
    console.error("Delete resource error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};
