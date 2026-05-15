import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProfilePage() {
  const avatars = [
    "https://wallpapers.com/images/hd/cute-anime-boy-with-mask-b9hvov6qo3sg7po0.jpg",
    "https://i.pinimg.com/originals/3f/71/a4/3f71a41e6f8c4bcf2188e64cc07be0f6.png",
    "https://wallpapers.com/images/hd/demon-slayer-nezuko-cute-cat-ears-pd7rxjcgd8excl1z.jpg",
    "https://cdn.theanimegallery.com/theanimegallery/731ba0ab-80a2-41e9-aa2a-ae3f8d1e4b3b-cute-demon-slayer-wallpaper.webp",
    "https://wallpaperbat.com/img/1511198-pretty-anime-girl-pink-wallpaper-girl-wallpaper-iphone.jpg",
  ];

  const fallbackAvatar =
    "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg";

  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("user")) || {};

    setUser(savedUser);
  }, []);

  const chooseAvatar = async (avatar) => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.put(
        "/auth/avatar",
        { avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Avatar updated ✨");
    } catch (err) {
      console.log(
        "AVATAR ERROR:",
        err.response?.data || err
      );

      alert("Avatar update failed");
    }
  };

  return (
    <div className="glass-card p-8 max-w-5xl mx-auto">

      <h1 className="text-4xl font-black mb-8">
        Profile ✨
      </h1>

      <div className="flex items-center gap-6">

        <img
          src={
            user?.avatar ||
            fallbackAvatar
          }
          onError={(e) => {
            e.currentTarget.src =
              fallbackAvatar;
          }}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-black">
            {user?.name ||
              "Guest User"}
          </h2>

          <p className="text-lg opacity-70">
            {user?.role ||
              "Student"}
          </p>

          <p className="text-sm opacity-60">
            {user?.email || ""}
          </p>
        </div>

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-black mb-5">
          Choose Avatar
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

          {avatars.map(
            (avatar, index) => (
              <button
                key={index}
                onClick={() =>
                  chooseAvatar(
                    avatar
                  )
                }
                className="rounded-3xl overflow-hidden border-4 border-white hover:scale-105 transition"
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-28 object-cover"
                />
              </button>
            )
          )}

        </div>
      </div>
    </div>
  );
}