const axios = require("axios");

const escapeTelegramHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

exports.sendContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (![name, email, phone, subject, message].every((value) => typeof value === "string" && value.trim())) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, subject, and message are required",
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram contact notifications are not configured.");
    return res.status(503).json({
      success: false,
      message: "Messaging service is temporarily unavailable",
    });
  }

  const telegramMessage = [
    "<b>New Contact Message</b>",
    "",
    `<b>Name</b> - ${escapeTelegramHtml(name.trim())}`,
    `<b>Email</b> - ${escapeTelegramHtml(email.trim())}`,
    `<b>Phone</b> - ${escapeTelegramHtml(phone.trim())}`,
    `<b>Subject</b> - ${escapeTelegramHtml(subject.trim())}`,
    `<b>Message</b> - ${escapeTelegramHtml(message.trim())}`,
  ].join("\n");

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: "HTML",
    });

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Telegram contact notification error:", error.response?.data || error.message);
    return res.status(502).json({
      success: false,
      message: "We could not send your message. Please try again later.",
    });
  }
};
