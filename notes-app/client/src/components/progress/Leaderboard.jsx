import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get("/auth/leaderboard")
      .then((res) => setUsers(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const medalFor = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="glass-card p-8 rounded-3xl">
      <h2 className="text-2xl font-bold text-black mb-6">👑 Leaderboard</h2>

      {loading && <p className="opacity-70">Loading rankings...</p>}
      {error && <p className="opacity-70">Couldn't load leaderboard right now.</p>}

      {!loading && !error && users.length === 0 && (
        <p className="opacity-70">No streaks yet — be the first!</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="space-y-3">
          {users.map((u, index) => {
            const isMe = u.name === currentUser.name;
            return (
              <div
                key={u._id || index}
                className={`flex items-center justify-between rounded-2xl p-4 transition ${
                  isMe ? "bg-orange-100 border-2 border-orange-300" : "bg-black/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-black w-8 text-center">
                    {medalFor(index)}
                  </span>
                  <img
                    src={u.avatar || "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-black text-sm">
                      {u.name} {isMe && <span className="text-orange-600">(You)</span>}
                    </p>
                    <p className="text-xs text-black/50">
                      Longest: {u.longestStreak || 0} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-black text-lg text-black">
                  🔥 {u.streak || 0}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}