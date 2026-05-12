export default function StudyRoomPage() {

  const rooms = [
    {
      name: "Biology Revision Room",
      members: "5 members active",
      image:
        "https://img.freepik.com/premium-photo/anime-study-room-night_899449-276857.jpg",
    },
    {
      name: "JEE Daily Group",
      members: "12 members active",
      image:
        "https://img.freepik.com/premium-photo/anime-boy-studying-library_1031776-514.jpg",
    },
    {
      name: "AI Learners Hub",
      members: "8 members active",
      image:
        "https://img.freepik.com/premium-photo/cute-anime-girl-reading-book-studying_1186913-6025.jpg",
    },
  ];

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div
        className="
        glass
        p-8
        rounded-[35px]
        relative
        overflow-hidden
      "
      >

        <img
          src="https://img.freepik.com/premium-photo/anime-study-room-night_899449-276857.jpg"
          alt=""
          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-30
        "
        />

        <div className="relative z-10">

          <h1
            className="
            text-5xl
            font-black
            text-white
            mb-3
          "
          >
            Multiplayer Study Room 👥
          </h1>

          <p className="text-white/80 text-lg">

            Study together with friends,
            join live focus rooms and
            stay productive.

          </p>

        </div>

      </div>

      {/* ACTIVE ROOMS */}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
      >

        {rooms.map((room, index) => (

          <div
            key={index}
            className="
            glass
            rounded-[35px]
            overflow-hidden
            hover:scale-[1.02]
            transition-all
            duration-300
          "
          >

            <img
              src={room.image}
              alt=""
              className="
              w-full
              h-52
              object-cover
            "
            />

            <div className="p-6">

              <h2
                className="
                text-2xl
                font-black
                mb-2
              "
              >
                {room.name}
              </h2>

              <p
                className="
                text-[#6d5c55]
                mb-6
              "
              >
                {room.members}
              </p>

              <button
                className="
                w-full
                py-3
                rounded-2xl
                bg-[#ff8a65]
                text-white
                font-bold
                hover:scale-[1.02]
                transition
              "
              >
                Join Room
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* CREATE ROOM */}

      <div
        className="
        glass
        p-8
        rounded-[35px]
      "
      >

        <h2
          className="
          text-3xl
          font-black
          mb-6
        "
        >
          Create Your Own Room ✨
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-5
        "
        >

          <input
            placeholder="Room Name"
            className="
            p-4
            rounded-2xl
            bg-white/50
            outline-none
          "
          />

          <input
            placeholder="Topic"
            className="
            p-4
            rounded-2xl
            bg-white/50
            outline-none
          "
          />

          <button
            className="
            rounded-2xl
            bg-[#ff8a65]
            text-white
            font-bold
          "
          >
            Create Room
          </button>

        </div>

      </div>

    </div>
  );
}