import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, Lock } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: otp+newpassword
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) return alert("Enter your email");
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      alert("OTP sent! Check your email.");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!otp || !newPassword) return alert("Enter OTP and new password");
    setLoading(true);
    try {
      await API.post("/auth/reset-password", { email, otp, newPassword });
      alert("Password reset successful! Please log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1e293b]">
      <div className="w-[440px] bg-white/10 border border-white/20 rounded-[32px] p-10 text-[#f5ead0]">
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-sm opacity-70 mb-8">
          {step === 1
            ? "Enter your account email to receive a reset code."
            : "Enter the code sent to your email and your new password."}
        </p>

        {step === 1 && (
          <>
            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-6">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-[#9d5c4d] hover:bg-[#8a4d40] transition py-3 rounded-2xl font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-4">
              <ShieldCheck size={18} />
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="bg-transparent outline-none w-full tracking-widest"
              />
            </div>
            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-6">
              <Lock size={18} />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-[#9d5c4d] hover:bg-[#8a4d40] transition py-3 rounded-2xl font-semibold disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              onClick={sendOtp}
              className="w-full mt-3 text-sm opacity-70 hover:opacity-100 underline"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}