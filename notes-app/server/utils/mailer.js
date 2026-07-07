const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp) => {
  const result = await resend.emails.send({
    from: "YumeNote <onboarding@resend.dev>",
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

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
};

module.exports = { sendOtpEmail };