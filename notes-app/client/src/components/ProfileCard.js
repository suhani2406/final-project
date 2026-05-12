export default function ProfilePage() {

  return (

    <div className="glass p-10 rounded-[35px]">

      <div className="flex items-center gap-6">

        <img
          src="https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"
          alt=""
          className="
          w-32
          h-32
          rounded-full
          object-cover
        "
        />

        <div>

          <h1 className="text-5xl font-black">

            Suhani Tiwari

          </h1>

          <p className="text-xl opacity-70 mt-2">

            Full Stack Developer

          </p>

        </div>

      </div>

    </div>
  );
}