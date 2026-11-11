
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');

const { google } = require('googleapis');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');

const Otp = require('./models/Otp');

const app = express();

app.use(express.json());
app.use(cors());

// ==========================================
// CONFIGURATION
// ==========================================

const PORT = process.env.PORT || 4000;

const supabase =
  process.env.SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    : null;

// Google OAuth
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  EMAIL_USER,
} = process.env;

const googleConfigured = Boolean(
  GOOGLE_CLIENT_ID &&
  GOOGLE_CLIENT_SECRET &&
  GOOGLE_REDIRECT_URI &&
  GOOGLE_REFRESH_TOKEN &&
  EMAIL_USER
);

const oAuth2Client = googleConfigured
  ? new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    )
  : null;

if (oAuth2Client) {
  oAuth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });
}

// Twilio
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_NUMBER,
  TWILIO_CONTENT_SID,
} = process.env;

const twilioConfigured = Boolean(
  TWILIO_ACCOUNT_SID &&
  TWILIO_AUTH_TOKEN &&
  TWILIO_WHATSAPP_NUMBER &&
  TWILIO_CONTENT_SID
);

const twilioClient = twilioConfigured
  ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

// ==========================================
// DATABASE CONNECTION
// ==========================================

async function connectDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/civicpulse'
    );

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// ==========================================
// GOOGLE EMAIL TRANSPORTER
// ==========================================

async function createTransporter() {
  if (!oAuth2Client) {
    throw new Error('Google email service is not configured');
  }

  const accessToken = await oAuth2Client.getAccessToken();

  if (!accessToken.token) {
    throw new Error('Unable to obtain Google access token');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
}

// ==========================================
// SUPABASE USER LOOKUP
// ==========================================

async function findSupabaseUserByEmail(email) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } =
      await supabase.auth.admin.listUsers({
        page,
        perPage,
      });

    if (error) {
      throw error;
    }

    const users = data.users || [];

    const user = users.find(
      (item) =>
        item.email?.toLowerCase() === email.toLowerCase()
    );

    if (user) return user;

    if (users.length < perPage) return null;

    page++;
  }
}

// ==========================================
// REQUEST OTP
// ==========================================

app.post('/api/request-otp', async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        error: 'Email or phone required',
      });
    }

    if (email && phone) {
      return res.status(400).json({
        error: 'Provide either email or phone, not both',
      });
    }

    const identifier = email || phone;

    // Verify email user through Supabase
    if (email) {
      const user = await findSupabaseUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }
    }

    // TODO: Add phone-user lookup using the
    // actual user collection/schema.
    // The original Otp.findOne() check was not
    // a valid user-registration check.

    // Generate secure six-digit OTP
    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const expires = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await Otp.findOneAndDelete({ identifier });

    await Otp.create({
      identifier,
      otp,
      expires,
    });

    // EMAIL OTP
    if (email) {
      const transporter = await createTransporter();

      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      });

      return res.json({
        success: true,
        message: 'OTP sent to email',
      });
    }

    // WHATSAPP OTP
    if (phone) {
      if (!twilioClient) {
        return res.status(503).json({
          error: 'WhatsApp OTP service is not configured',
        });
      }

      const formattedPhone = phone.startsWith('+')
        ? phone
        : '+91' + phone;

      const message = await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        contentSid: TWILIO_CONTENT_SID,
        contentVariables: JSON.stringify({
          '1': otp,
        }),
        to: `whatsapp:${formattedPhone}`,
      });

      return res.json({
        success: true,
        message: 'OTP sent to WhatsApp',
        sid: message.sid,
      });
    }

  } catch (error) {
    console.error('OTP request error:', error.message);

    return res.status(500).json({
      error: 'Failed to send OTP',
    });
  }
});

// ==========================================
// VERIFY OTP
// ==========================================

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        error: 'Identifier and OTP are required',
      });
    }

    const record = await Otp.findOne({
      identifier,
      otp,
    });

    if (!record || record.expires < new Date()) {
      return res.status(400).json({
        error: 'Invalid or expired OTP',
      });
    }

    await Otp.deleteOne({
      _id: record._id,
    });

    return res.json({
      success: true,
      message: 'OTP verified successfully',
    });

  } catch (error) {
    console.error('OTP verification error:', error.message);

    return res.status(500).json({
      error: 'OTP verification failed',
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`OTP server running on port ${PORT}`);
  });
}

startServer();
