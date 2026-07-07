import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: otp+newpassword, 3: done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    setErrorMsg("");
    setInfoMsg("");
    if (!email) return setErrorMsg("Enter your email first.");

    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      setInfoMsg("OTP sent! Check your inbox (and spam folder).");
      setStep(2);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setErrorMsg("");
    if (!otp || !newPassword) return setErrorMsg("Enter both the OTP and a new password.");

    setLoading(true);
    try {
      await API.post("/auth/reset-password", { email, otp, newPassword });
      setStep(3);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Reset failed. Check your OTP and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1e293b] p-4">
      <div className="w-full max-w-[440px] bg-white/10 border border-white/20 rounded-[32px] p-8 sm:p-10 text-[#f5ead0]">

        {/* Step indicator so it's obvious where you are */}
        {step !== 3 && (
          <div className="flex items-center gap-2 mb-6">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#d95f4c]" : "bg-white/20"}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#d95f4c]" : "bg-white/20"}`} />
          </div>
        )}

        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-sm opacity-70 mb-8">
              Enter your account email to receive a reset code.
            </p>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-4">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm mb-4">{errorMsg}</p>}

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
            <h1 className="text-3xl font-bold mb-2">Enter Code</h1>
            {infoMsg && (
              <p className="text-sm text-green-400 mb-1">{infoMsg}</p>
            )}
            <p className="text-sm opacity-70 mb-8">
              Sent to <span className="font-semibold">{email}</span> — enter the 6-digit code below along with your new password.
            </p>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-4">
              <ShieldCheck size={18} />
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                className="bg-transparent outline-none w-full tracking-[0.3em] text-lg font-bold"
              />
            </div>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-4">
              <Lock size={18} />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm mb-4">{errorMsg}</p>}

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-[#9d5c4d] hover:bg-[#8a4d40] transition py-3 rounded-2xl font-semibold disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <button onClick={() => setStep(1)} className="opacity-70 hover:opacity-100 underline">
                Wrong email?
              </button>
              <button onClick={sendOtp} disabled={loading} className="opacity-70 hover:opacity-100 underline">
                Resend OTP
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="text-center py-6">
            <CheckCircle2 size={56} className="mx-auto text-green-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Password Reset!</h1>
            <p className="text-sm opacity-70 mb-8">
              Your password has been updated. You can now log in with your new password.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#9d5c4d] hover:bg-[#8a4d40] transition py-3 rounded-2xl font-semibold"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}