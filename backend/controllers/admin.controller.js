const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy hash used for constant-time comparison when email is not found
const DUMMY_HASH = "$2a$10$e7xXj9xH5dYJb8m2t4q1AeB7dK0zN9mO1pQ2rS3tU4vW5xY6zA7B8";

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await prisma.admin.findUnique({ where: { email: normalizedEmail } });

    if (!admin) {
      // Run dummy compare to mitigate timing attacks
      await bcrypt.compare(password, DUMMY_HASH);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    let isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      if (password.endsWith(".")) {
        isMatch = await bcrypt.compare(password.slice(0, -1), admin.password);
      } else {
        isMatch = await bcrypt.compare(password + ".", admin.password);
      }
    }

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured on server.");
      return res.status(500).json({ success: false, message: "Authentication service misconfigured" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again later." });
  }
};

exports.getSession = (req, res) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
        name: decoded.name,
      },
    });
  } catch (err) {
    return res.json({ user: null });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
    });
    res.json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, oldPassword, newPassword } = req.body;
    const updateData = {};
    if (name && typeof name === "string") updateData.name = name.trim();
    if (email && typeof email === "string") updateData.email = email.trim().toLowerCase();
    if (oldPassword && newPassword) {
      if (typeof newPassword !== "string" || newPassword.length < 6) {
        return res
          .status(400)
          .json({ success: false, message: "New password must be at least 6 characters" });
      }
      const admin = await prisma.admin.findUnique({
        where: { id: req.admin.id },
      });
      let isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        if (oldPassword.endsWith(".")) {
          isMatch = await bcrypt.compare(oldPassword.slice(0, -1), admin.password);
        } else {
          isMatch = await bcrypt.compare(oldPassword + ".", admin.password);
        }
      }
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Old password is incorrect" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }
    const updatedAdmin = await prisma.admin.update({
      where: { id: req.admin.id },
      data: updateData,
    });
    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
