const fs = require("fs");
const path = require("path");
const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const { sendTelegramMessage } = require("../lib/telegram");

const saveReceiptLocally = (file) => {
  const uploadsDir = path.join(__dirname, "..", "uploads", "booking-receipts");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const safeName = `${Date.now()}-${String(file.originalname || "receipt").replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const filePath = path.join(uploadsDir, safeName);
  fs.writeFileSync(filePath, file.buffer);

  return {
    receiptUrl: `/uploads/booking-receipts/${safeName}`,
    receiptPublicId: filePath,
  };
};

exports.createBookingSubmission = async (req, res) => {
  try {
    const { fullName, phone, examType, mentorshipType, totalAmount, status } = req.body;
    const receiptFile = req.file;

    if (!fullName || !phone || !examType) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone number, and exam type are required.",
      });
    }

    if (!receiptFile) {
      return res.status(400).json({
        success: false,
        message: "A payment receipt is required.",
      });
    }

    let receiptUrl = "";
    let receiptPublicId = null;

    const cloudinaryConfigured = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );

    if (cloudinaryConfigured) {
      const uploadResult = await uploadToCloudinary(
        receiptFile.buffer,
        receiptFile.mimetype,
        "booking-receipts",
        receiptFile.originalname
      );

      receiptUrl = uploadResult.secure_url;
      receiptPublicId = uploadResult.public_id;
    } else {
      const localUpload = saveReceiptLocally(receiptFile);
      receiptUrl = localUpload.receiptUrl;
      receiptPublicId = localUpload.receiptPublicId;
    }

    const submission = await prisma.bookingSubmission.create({
      data: {
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        examType: String(examType).trim(),
        mentorshipType: mentorshipType ? String(mentorshipType).trim() : null,
        totalAmount: Number(totalAmount || 0),
        receiptUrl,
        receiptPublicId,
        status: status || "pending",
      },
    });

    const telegramMessage = [
      "<b>New test taker</b>",
      `Name: ${submission.fullName}`,
      `Phone: ${submission.phone}`,
      `Exam: ${submission.examType}`,
      submission.mentorshipType ? `Mentorship: ${submission.mentorshipType}` : null,
      submission.totalAmount ? `Total: ${Number(submission.totalAmount).toLocaleString()} ETB` : null,
      `Receipt: ${submission.receiptUrl}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendTelegramMessage(telegramMessage);
    } catch (telegramError) {
      console.error("Booking Telegram notification failed:", telegramError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully and sent for approval.",
      data: submission,
    });
  } catch (error) {
    console.error("Create booking submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit booking.",
      error: error.message,
    });
  }
};

exports.getBookingSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.bookingSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};

exports.updateBookingSubmission = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const submission = await prisma.bookingSubmission.update({
      where: { id: req.params.id },
      data: {
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes: String(notes).trim() } : {}),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: submission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update booking.",
      error: error.message,
    });
  }
};

exports.deleteBookingSubmission = async (req, res) => {
  try {
    const submission = await prisma.bookingSubmission.findUnique({
      where: { id: req.params.id },
    });

    if (submission?.receiptPublicId) {
      const isLocalReceipt = typeof submission.receiptPublicId === "string" && submission.receiptPublicId.includes(path.join(__dirname, "..", "uploads"));
      if (isLocalReceipt && fs.existsSync(submission.receiptPublicId)) {
        fs.unlinkSync(submission.receiptPublicId);
      } else {
        const cloudinary = require("../lib/cloudinary");
        if (cloudinary) {
          await cloudinary.uploader.destroy(submission.receiptPublicId, { resource_type: "auto" });
        }
      }
    }

    await prisma.bookingSubmission.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete booking.",
      error: error.message,
    });
  }
};
