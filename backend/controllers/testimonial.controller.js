const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const cloudinary = require("cloudinary").v2;

// Create Testimonial
exports.createTestimonial = async (req, res) => {
  try {
    let imageUrl, imageId;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "testimonials"
      );
      imageUrl = uploadResult.secure_url;
      imageId = uploadResult.public_id;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        student: req.body.student,
        exam: req.body.exam,
        rating: parseInt(req.body.rating, 10),
        testimonial: req.body.testimonial,
        image: imageUrl || null,
        imageId: imageId || null,
      },
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Testimonial
exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: req.params.id }, 
    });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    let imageUrl, imageId;

    const existing = await prisma.testimonial.findUnique({
      where: { id: req.params.id },
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
        "testimonials"
      );
      imageUrl = uploadResult.secure_url;
      imageId = uploadResult.public_id;
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id }, 
      data: {
        ...(req.body.student && { student: req.body.student }),
        ...(req.body.exam && { exam: req.body.exam }),
        ...(req.body.rating && { rating: parseInt(req.body.rating, 10) }),
        ...(req.body.testimonial && { testimonial: req.body.testimonial }),
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(imageId ? { imageId } : {}),
      },
    });

    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: req.params.id },
    });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (testimonial.imageId) {
      await cloudinary.uploader.destroy(testimonial.imageId);
    }

    await prisma.testimonial.delete({ where: { id: req.params.id } }); 

    res.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
