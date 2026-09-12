const prisma = require("../prisma/client");

const normalizeOpportunityPayload = (body = {}) => {
  const rawCategory = String(body.category || "Scholarships").trim();
  const title = String(body.title || "").trim();
  const country = String(body.country || "").trim();
  const flag = String(body.flag || "🌍").trim() || "🌍";
  const funding = String(body.funding || "Open").trim() || "Open";
  const description = String(body.description || "").trim();
  const eligibility = String(body.eligibility || "").trim();
  const deadline = String(body.deadline || "").trim();
  const degree = String(body.degree || "").trim();
  const fundingColor = String(body.fundingColor || "#D4A43A").trim() || "#D4A43A";
  const category = rawCategory || "Scholarships";

  return {
    title,
    country,
    flag,
    funding,
    fundingColor,
    degree,
    description,
    deadline,
    eligibility,
    category,
    daysLeft: Number.isFinite(Number(body.daysLeft)) ? Number(body.daysLeft) : null,
    featured: Boolean(body.featured),
    isPublished: body.isPublished === false ? false : true,
  };
};

exports.getStudyAbroadOpportunities = async (req, res) => {
  try {
    const opportunities = await prisma.studyAbroadOpportunity.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      message: "Study abroad opportunities fetched successfully",
      data: opportunities,
    });
  } catch (error) {
    console.error("Get study abroad opportunities error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch study abroad opportunities",
      error: error.message,
    });
  }
};

exports.getStudyAbroadOpportunity = async (req, res) => {
  try {
    const opportunity = await prisma.studyAbroadOpportunity.findUnique({
      where: { id: req.params.id },
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Study abroad opportunity not found",
      });
    }

    res.json({
      success: true,
      message: "Study abroad opportunity fetched successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Get study abroad opportunity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch study abroad opportunity",
      error: error.message,
    });
  }
};

exports.createStudyAbroadOpportunity = async (req, res) => {
  try {
    const payload = normalizeOpportunityPayload(req.body);

    if (!payload.title || !payload.country || !payload.description) {
      return res.status(400).json({
        success: false,
        message: "Title, country, and description are required",
      });
    }

    const opportunity = await prisma.studyAbroadOpportunity.create({
      data: payload,
    });

    res.status(201).json({
      success: true,
      message: "Study abroad opportunity created successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Create study abroad opportunity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create study abroad opportunity",
      error: error.message,
    });
  }
};

exports.updateStudyAbroadOpportunity = async (req, res) => {
  try {
    const payload = normalizeOpportunityPayload(req.body);

    const opportunity = await prisma.studyAbroadOpportunity.update({
      where: { id: req.params.id },
      data: payload,
    });

    res.json({
      success: true,
      message: "Study abroad opportunity updated successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Update study abroad opportunity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update study abroad opportunity",
      error: error.message,
    });
  }
};

exports.deleteStudyAbroadOpportunity = async (req, res) => {
  try {
    await prisma.studyAbroadOpportunity.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: "Study abroad opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete study abroad opportunity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete study abroad opportunity",
      error: error.message,
    });
  }
};
