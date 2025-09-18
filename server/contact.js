// Express backend for contact form
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure your mail here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'swarajrath6@gmail.com', // <-- your email
  pass: 'prox zgmm mdrq ofsw' // <-- updated Gmail app password
  }
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await transporter.sendMail({
      from: 'swarajrath6@gmail.com', // always use your Gmail as sender for Gmail SMTP
      to: 'swarajrath6@gmail.com', // your email
      replyTo: email, // user's email for reply
      subject: `[CivicPulse Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
