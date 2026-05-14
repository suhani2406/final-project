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
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

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

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  if (!user) {
    return (
      <div className="glass-card p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">

      <div className="glass-card rounded-[35px] p-6 md:p-8 overflow-hidden">

        <h1 className="text-3xl md:text-4xl font-black mb-8">
          Profile ✨
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={user.avatar || avatars[0]}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div className="text-center md:text-left">

            <h2 className="text-3xl font-black">
              {user.name}
            </h2>

            <p className="opacity-70 text-lg">
              {user.bio || "Student"}
            </p>

            <p className="opacity-60 text-sm mt-2">
              {user.email}
            </p>

          </div>
        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-black mb-5">
            Choose Avatar
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {avatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() =>
                  chooseAvatar(avatar)
                }
                className={`
                overflow-hidden
                rounded-2xl
                border-4
                transition
                hover:scale-105
                ${
                  user.avatar === avatar
                    ? "border-pink-400"
                    : "border-white"
                }
                `}
              >
                <img
                  src={avatar}
                  alt={`avatar-${index}`}
                  className="w-full h-28 object-cover"
                />
              </button>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}