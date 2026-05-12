export default function ProfilePage() {

  return (

    <div
      className="
      bg-white/15
      bg-[#1e293b]
      border border-white/10
      rounded-[35px]
      p-10
    "
    >

      <div className="flex items-center gap-8">

        <img
          src="https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"
          alt=""
          className="
          w-40
          h-40
          rounded-full
          object-cover
        "
        />

        <div>

          <h1
            className="
            text-6xl
            font-black
            text-white
          "
          >
            Suhani Tiwari
          </h1>

          <p
            className="
            text-2xl
            text-white/70
            mt-3
          "
          >
            Full Stack Developer
          </p>

        </div>

      </div>

    </div>
  );
}