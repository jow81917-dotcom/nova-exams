const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("cloudinary").v2;

// Create Team Member
exports.createTeamMember = async (req, res) => {
  try {
    let imageUrl, imageId;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "team"
      );
      imageUrl = uploadResult.secure_url;
      imageId = uploadResult.public_id;
    }

    const member = await prisma.teamMember.create({
      data: {
        name: req.body.name,
        role: req.body.role,
        bio: req.body.bio,
        image: imageUrl || null,
        imageId: imageId || null,
      },
    });

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Team Members
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Team Member
exports.getTeamMember = async (req, res) => {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    let imageUrl, imageId;

    const existing = await prisma.teamMember.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (req.file) {
      if (existing.imageId) {
        await cloudinary.uploader.destroy(existing.imageId);
      }
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "team"
      );
      imageUrl = uploadResult.secure_url;
      imageId = uploadResult.public_id;
    }

    const member = await prisma.teamMember.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.role && { role: req.body.role }),
        ...(req.body.bio && { bio: req.body.bio }),
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(imageId ? { imageId } : {}),
      },
    });

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Team Member
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!member) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (member.imageId) {
      await cloudinary.uploader.destroy(member.imageId);
    }

    await prisma.teamMember.delete({ where: { id: Number(req.params.id) } });

    res.json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
