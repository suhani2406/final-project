import { useEffect, useState } from "react";

export default function ProfilePage() {
  const avatars = [
    "https://wallpapers.com/images/hd/cute-anime-boy-with-mask-b9hvov6qo3sg7po0.jpg",
    "https://i.pinimg.com/originals/3f/71/a4/3f71a41e6f8c4bcf2188e64cc07be0f6.png",
    "https://wallpapers.com/images/hd/demon-slayer-nezuko-cute-cat-ears-pd7rxjcgd8excl1z.jpg",
    "https://cdn.theanimegallery.com/theanimegallery/731ba0ab-80a2-41e9-aa2a-ae3f8d1e4b3b-cute-demon-slayer-wallpaper.webp",
    "https://wallpaperbat.com/img/1511198-pretty-anime-girl-pink-wallpaper-girl-wallpaper-iphone.jpg",
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const chooseAvatar = (avatar) => {
    const updatedUser = {
      ...user,
      avatar,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="glass-card p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Profile ✨</h1>

      <div className="flex items-center gap-6">
        <img
          src={user?.avatar || avatars[0]}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-black">
            {user?.name || "Guest User"}
          </h2>

          <p className="opacity-70 mt-1">
            {user?.email || "No email"}
          </p>

          <p className="mt-2 font-semibold">
            {user?.bio || "Student"}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-black mb-5">
          Choose Avatar
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {avatars.map((avatar, index) => (
            <button
              key={index}
              onClick={() => chooseAvatar(avatar)}
              className="rounded-3xl overflow-hidden hover:scale-105 transition border-4 border-white/80"
            >
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-28 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}