const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY, // API Key Mailgun
  domain: process.env.MAILGUN_DOMAIN,  // Domain Mailgun
});

module.exports = mg;
