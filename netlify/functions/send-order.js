exports.handler = async (event) => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const data = JSON.parse(event.body);

    const caption = `
🛒 NEW GOTCHA ORDER

Name: ${data.name}
Phone: ${data.phone}
Address: ${data.address}
Item: Cultural Treasure (White)
Price: 48,000 MMK
`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: caption,
      }),
    });

    return {
      statusCode: 200,
      body: "Order sent",
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
