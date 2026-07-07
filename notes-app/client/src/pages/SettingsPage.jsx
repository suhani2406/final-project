import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Trash2, AlertTriangle, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import API from "../api/axios";

export default function SettingsPage() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const cardClass = darkMode
    ? "bg-[#1a1530]/70 border border-white/10 text-[#f5ead0]"
    : "bg-white/70 border border-black/10 text-[#2f2420]";

  const handleDeleteAccount = async () => {
    setErrorMsg("");
    if (!password) {
      setErrorMsg("Please enter your password to confirm.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.delete("/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
        data: { password },
      });

      localStorage.clear();
      navigate("/");
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className={`text-4xl font-black ${darkMode ? "text-[#f5ead0]" : "text-black"}`}>
          ⚙️ Settings
        </h1>
        <p className={`mt-2 ${darkMode ? "text-white/60" : "text-black/60"}`}>
          Manage your preferences and account.
        </p>
      </div>

      {/* Appearance */}
      <div className={`rounded-3xl p-6 backdrop-blur-xl ${cardClass}`}>
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between rounded-2xl p-4 ${
            darkMode ? "bg-white/5" : "bg-black/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <Moon size={18} />
            <span className="font-semibold">Dark Mode</span>
          </div>
          <div className={`w-11 h-6 rounded-full transition ${darkMode ? "bg-[#d95f4c]" : "bg-gray-300"}`}>
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${
                darkMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Danger Zone */}
      <div className={`rounded-3xl p-6 backdrop-blur-xl border-2 border-red-500/40 ${
        darkMode ? "bg-red-500/5" : "bg-red-50"
      }`}>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-500">
          <AlertTriangle size={20} />
          Danger Zone
        </h2>
        <p className={`text-sm mb-4 ${darkMode ? "text-white/60" : "text-black/60"}`}>
          Deleting your account is permanent and cannot be undone. All your notes,
          progress, and study data will be lost forever.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        >
          <Trash2 size={16} />
          Delete Account
        </button>
      </div>

      {/* Confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-md rounded-3xl p-8 ${
            darkMode ? "bg-[#1a1530] text-[#f5ead0]" : "bg-white text-[#2f2420]"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                <AlertTriangle size={22} />
                Delete Account?
              </h2>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                  setErrorMsg("");
                }}
                className="opacity-60 hover:opacity-100"
              >
                <X size={22} />
              </button>
            </div>

            <p className="text-sm opacity-70 mb-6">
              This action is permanent. All your data will be deleted forever.
              Enter your password to confirm.
            </p>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl outline-none mb-3 ${
                darkMode ? "bg-white/10 border border-white/10" : "bg-black/5 border border-black/10"
              }`}
            />

            {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                  setErrorMsg("");
                }}
                className={`flex-1 py-3 rounded-2xl font-semibold ${
                  darkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 py-3 rounded-2xl font-semibold bg-red-500 hover:bg-red-600 text-white disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete Forever"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}