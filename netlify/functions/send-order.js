const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const form = new FormData();
    form.append("chat_id", chatId);

    const fields = event.body;

    const name = event.headers["x-name"];
    const phone = event.headers["x-phone"];
    const address = event.headers["x-address"];

    const caption = `
🛒 NEW GOTCHA ORDER

Name: ${name}
Phone: ${phone}
Address: ${address}
Item: Cultural Treasure (White)
Price: 48,000 MMK
`;

    form.append("caption", caption);

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      body: new URLSearchParams({
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
