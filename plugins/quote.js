

const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "terra-quote",
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        const message = `
💬 "${quote.content}"
- ${quote.author}
*QUOTES BY TERRA MD*
        `;
        return reply(message);
    } catch (e) {
        console.error("Error fetching quote:", e);
        reply("could not fetch a quote please try again later .");
    }
});
