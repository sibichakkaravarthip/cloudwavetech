/**
 * CloudWaveTech Portfolio Contact Form API Server
 * 
 * Tech Stack: Node.js, Express, Nodemailer, cors, dotenv
 * Features:
 *  - CORS and JSON middleware
 *  - POST /send endpoint to receive name, email, subject, message
 *  - Empty field validation
 *  - Nodemailer transporter using Gmail SMTP
 *  - Responsive HTML + plain-text fallback templates
 *  - Robust crash prevention and error handling
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// 1. Configure Middlewares
app.use(cors());
app.use(express.json());

// 2. Validate request payload middleware
const validateContactPayload = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Name field is required and cannot be empty.'
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Email field is required and cannot be empty.'
    });
  }

  // Regular expression for validating standard email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Please provide a valid email address.'
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      message: 'Message field is required and cannot be empty.'
    });
  }

  next();
};

// 3. POST Endpoint for Contact Form Submission
app.post('/send', validateContactPayload, async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const submissionTime = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  // Extract env variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass || emailUser.includes('your-email') || emailPass.includes('your-gmail-app-password')) {
    console.error('Error: SMTP credentials have not been configured in the .env file.');
    return res.status(500).json({
      success: false,
      error: 'SMTP Configuration Missing',
      message: 'Server has not been configured with valid Gmail App credentials. Please check back later.'
    });
  }

  // Create transporter with Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  // Construct Email Contents
  const mailSubject = `CloudWaveTech Lead: ${subject ? subject.trim() : 'New Contact Inquiry'}`;
  
  // HTML Template for beautiful styling in Gmail inbox
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Lead Inquiry</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6f9;
          margin: 0;
          padding: 20px;
          color: #2e384d;
        }
        .card {
          max-width: 600px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e1e4e8;
          margin: 20px auto;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #1e40af, #0891b2);
          color: #ffffff;
          padding: 24px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .content {
          padding: 30px;
        }
        .item {
          margin-bottom: 20px;
          border-bottom: 1px solid #f0f2f5;
          padding-bottom: 15px;
        }
        .item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .label {
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          color: #6b7280;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .val {
          font-size: 15px;
          color: #1f2937;
          line-height: 1.5;
        }
        .message-text {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 15px;
          font-size: 14px;
          color: #374151;
          border-left: 4px solid #3b82f6;
          white-space: pre-wrap;
          line-height: 1.6;
        }
        .footer {
          background-color: #f9fafb;
          padding: 15px;
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
          border-top: 1px solid #f0f2f5;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2>New Form Submission</h2>
        </div>
        <div class="content">
          <div class="item">
            <div class="label">Client Name</div>
            <div class="val"><strong>${name.trim()}</strong></div>
          </div>
          <div class="item">
            <div class="label">Client Email</div>
            <div class="val">
              <a href="mailto:${email.trim()}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">
                ${email.trim()}
              </a>
            </div>
          </div>
          <div class="item">
            <div class="label">Subject</div>
            <div class="val">${subject ? subject.trim() : 'No Subject Provided'}</div>
          </div>
          <div class="item">
            <div class="label">Message</div>
            <div class="message-text">${message.trim()}</div>
          </div>
          <div class="item">
            <div class="label">Submission Time</div>
            <div class="val">${submissionTime}</div>
          </div>
        </div>
        <div class="footer">
          Sent securely via CloudWaveTech Portfolio Contact Form API.
        </div>
      </div>
    </body>
    </html>
  `;

  // Fallback plain text representation for non-HTML mail clients
  const textBody = `
CloudWaveTech Contact Form Submission
=====================================

Client Name:     ${name.trim()}
Client Email:    ${email.trim()}
Subject:         ${subject ? subject.trim() : 'No Subject Provided'}
Submission Time: ${submissionTime}

Message:
--------------------------------------------------
${message.trim()}
--------------------------------------------------

--
Sent securely via CloudWaveTech Contact Form API.
  `.trim();

  // Transporter options
  const mailOptions = {
    from: `"${name.trim()}" <${emailUser}>`, // Must send FROM the authenticated email
    replyTo: email.trim(), // Replying to the mail will reply directly to the client's email
    to: emailUser, // Deliver to owner's inbox
    subject: mailSubject,
    text: textBody,
    html: htmlBody
  };

  try {
    // Send email using transporter
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been successfully transmitted directly to our inbox.'
    });
  } catch (error) {
    console.error('Nodemailer SMTP Error occurred while processing submission:', error);
    return res.status(500).json({
      success: false,
      error: 'SMTP Transmission Failure',
      message: 'An issue occurred while attempting to send email. Please try again later.',
      details: error.message
    });
  }
});

// 4. Global Error Handling Middleware to prevent server crashes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON',
      message: 'The request payload contains invalid JSON formatting.'
    });
  }
  console.error('Unhandled Application Exception caught:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred on the server. Please try again later.'
  });
});

// 5. Uncaught Exceptions/Rejections listener to ensure server stability
process.on('uncaughtException', (err) => {
  console.error('FATAL: Uncaught Exception raised:', err);
  // Log critical error; keep server running unless necessary to exit
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('FATAL: Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

// 6. Bind to Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[CloudWaveTech Backend] Server successfully running on port ${PORT}`);
});
