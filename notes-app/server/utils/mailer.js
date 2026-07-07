const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"YumeNote 🌸" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your YumeNote Password Reset Code",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Password Reset Code</h2>
        <p>Your one-time code is:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendOtpEmail };