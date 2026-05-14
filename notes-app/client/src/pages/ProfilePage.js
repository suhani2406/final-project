import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const avatars = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Anna",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakura",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Mika",
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4">

        <img
          src={
            user?.avatar ||
            avatars[0]
          }
          alt="profile"
          className="w-24 h-24 rounded-full"
        />

        <div>
          <h1 className="text-2xl font-bold">
            {user?.name || "Guest"}
          </h1>

          <p>
            {user?.bio || "Student"}
          </p>
        </div>
      </div>
    </div>
  );
}