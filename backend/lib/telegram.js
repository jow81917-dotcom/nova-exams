const axios = require("axios");

async function sendTelegramMessage(message) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram bot is not configured.");
  }

  const text = typeof message === "string" ? message.trim() : "";

  if (!text) {
    throw new Error("Telegram message is empty.");
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      },
      {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !response.data.ok) {
      const detail = response.data?.description || "Telegram request failed.";
      throw new Error(detail);
    }

    return {
      ok: true,
      messageId: response.data.result?.message_id || null,
    };
  } catch (error) {
    const detail = error?.response?.data?.description || error.message || "Telegram request failed.";
    throw new Error(detail);
  }
}

module.exports = { sendTelegramMessage };
