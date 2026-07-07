const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000, // 10s to establish connection
  greetingTimeout: 10000,
  socketTimeout: 10000,
});
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp) => {
   await resend.emails.send({
    from: "YumeNote <onboarding@resend.dev>", // Resend's default until you verify your own domain
    to,
    subject: "Your YumeNote Password Reset Code",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Password Reset Code</h2>
        <p>Your one-time code is:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
};

module.exports = { sendOtpEmail };