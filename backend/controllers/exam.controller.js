const prisma = require("../prisma/client");

exports.createExam = async (req, res) => {
  const { examType, mentorship, mentorshipValue, examRoomService, sum } =
    req.body;

  if (
    !examType ||
    !mentorship ||
    examRoomService === undefined ||
    sum === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const exam = await prisma.exam.create({
      data: {
        examType,
        mentorship,
        mentorshipValue:
          mentorshipValue !== undefined ? Number(mentorshipValue) : 0,
        examRoomService: Number(examRoomService),
        sum: Number(sum),
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
    const exam = await prisma.exam.update({
      where: { id: req.params.id },
      data: {
        examType: req.body.examType,
        mentorship: req.body.mentorship,
        mentorshipValue:
          req.body.mentorshipValue !== undefined
            ? Number(req.body.mentorshipValue)
            : undefined,
        examRoomService: Number(req.body.examRoomService),
        sum: Number(req.body.sum),
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
