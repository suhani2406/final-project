import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Lock } from "lucide-react";

export default function DeleteAccountSection({ darkMode }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setErrorMsg("");
    if (!password) return setErrorMsg("Enter your password to confirm.");

    setLoading(true);
    try {
      await API.delete("/auth/delete-account", {
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
    <div
      className={`rounded-2xl p-6 border ${
        darkMode ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="text-red-500" size={20} />
        <h3 className="font-bold text-red-500">Delete Account</h3>
      </div>
      <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-black/60"}`}>
        This permanently deletes your account and all associated data. This cannot be undone.
      </p>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 font-semibold text-sm hover:bg-red-500/20 transition"
        >
          Delete My Account
        </button>
      ) : (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 border ${
              darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/10"
            }`}
          >
            <Lock size={16} className="opacity-60" />
            <input
              type="password"
              placeholder="Confirm your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Yes, Delete Permanently"}
            </button>
            <button
              onClick={() => {
                setShowConfirm(false);
                setPassword("");
                setErrorMsg("");
              }}
              className="px-4 py-2 rounded-xl bg-black/5 text-sm font-semibold hover:bg-black/10 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}