const prisma = require("../prisma/client");

const normalizeMentorshipOptions = (raw, fallbackMentorship = "", fallbackValue = 0) => {
  const parsed = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? [raw]
      : [];

  const options = parsed
    .map((option, index) => {
      if (typeof option === "string") {
        return {
          type: option || `Mentorship ${index + 1}`,
          value: Number(fallbackValue || 0),
        };
      }

      const type = String(option?.type || option?.name || option?.label || fallbackMentorship || `Mentorship ${index + 1}`).trim();
      const value = Number(option?.value ?? option?.amount ?? option?.mentorshipValue ?? fallbackValue ?? 0);

      if (!type && value === 0) {
        return null;
      }

      return {
        type: type || `Mentorship ${index + 1}`,
        value: Number.isFinite(value) ? value : 0,
      };
    })
    .filter(Boolean);

  if (options.length > 0) {
    return options;
  }

  const legacyType = fallbackMentorship || "Mentorship";
  const legacyValue = Number(fallbackValue || 0);

  return legacyType ? [{ type: legacyType, value: legacyValue }] : [];
};

exports.createExam = async (req, res) => {
  try {
    const examType = req.body.examType;
    const examPrice = Number(req.body.examPrice ?? req.body.basePrice ?? 0);
    const examRoomService = Number(req.body.examRoomService ?? 0);
    const bankName = req.body.bankName ? String(req.body.bankName).trim() : null;
    const accountName = req.body.accountName ? String(req.body.accountName).trim() : null;
    const accountNumber = req.body.accountNumber ? String(req.body.accountNumber).trim() : null;
    const mentorshipOptions = normalizeMentorshipOptions(
      req.body.mentorshipOptions,
      req.body.mentorship,
      req.body.mentorshipValue
    );
    const primaryMentorship = mentorshipOptions[0] || { type: "Mentorship", value: 0 };
    const sum = Number(
      req.body.sum ?? examPrice + examRoomService + (primaryMentorship.value || 0)
    );

    if (!examType || examRoomService === undefined || sum === undefined) {
      return res.status(400).json({
        success: false,
        message: "Exam type and price fields are required",
      });
    }

    const exam = await prisma.exam.create({
      data: {
        examType,
        mentorship: primaryMentorship.type,
        mentorshipValue: Number(primaryMentorship.value || 0),
        mentorshipOptions,
        examPrice,
        examRoomService,
        sum,
        bankName,
        accountName,
        accountNumber,
      },
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany();
    res.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
};

exports.getExam = async (req, res) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: req.params.id },
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }
    res.json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exam",
      error: error.message,
    });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const examType = req.body.examType;
    const examPrice = Number(req.body.examPrice ?? req.body.basePrice ?? 0);
    const examRoomService = Number(req.body.examRoomService ?? 0);
    const bankName = req.body.bankName !== undefined ? (req.body.bankName ? String(req.body.bankName).trim() : null) : undefined;
    const accountName = req.body.accountName !== undefined ? (req.body.accountName ? String(req.body.accountName).trim() : null) : undefined;
    const accountNumber = req.body.accountNumber !== undefined ? (req.body.accountNumber ? String(req.body.accountNumber).trim() : null) : undefined;
    const mentorshipOptions = normalizeMentorshipOptions(
      req.body.mentorshipOptions,
      req.body.mentorship,
      req.body.mentorshipValue
    );
    const primaryMentorship = mentorshipOptions[0] || { type: "Mentorship", value: 0 };
    const sum = Number(
      req.body.sum ?? examPrice + examRoomService + (primaryMentorship.value || 0)
    );

    const exam = await prisma.exam.update({
      where: { id: req.params.id },
      data: {
        ...(examType ? { examType } : {}),
        mentorship: primaryMentorship.type,
        mentorshipValue: Number(primaryMentorship.value || 0),
        mentorshipOptions,
        examPrice,
        examRoomService,
        sum,
        ...(bankName !== undefined ? { bankName } : {}),
        ...(accountName !== undefined ? { accountName } : {}),
        ...(accountNumber !== undefined ? { accountNumber } : {}),
      },
    });

    res.json({
      success: true,
      message: "Exam updated successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update exam",
      error: error.message,
    });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await prisma.exam.delete({ where: { id: req.params.id } });
    res.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};
