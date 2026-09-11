const { sendTelegramMessage } = require("../lib/telegram");

exports.testTelegram = async (req, res) => {
  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A message is required.",
      });
    }

    await sendTelegramMessage(message.trim());

    return res.status(200).json({
      success: true,
      message: "Telegram message sent successfully.",
    });
  } catch (error) {
    console.error("Telegram send error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Telegram message could not be sent.",
      error: "Telegram service unavailable or misconfigured.",
    });
  }
};
