import { useEffect, useState } from "react";
import { Copy, Plus, Send, Users } from "lucide-react";
import API from "../api/axios";

export default function StudyRoomPage() {

  const [rooms, setRooms] = useState([]);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [goal, setGoal] = useState("");

  const [roomCode, setRoomCode] = useState("");

  const [message, setMessage] = useState("");

  // AUTH CONFIG
  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // FETCH ROOMS
  const fetchRooms = async () => {
    try {

      const res = await API.get(
        "/study-rooms",
        getAuthConfig()
      );

      setRooms(res.data);

    } catch (err) {

      console.log("FETCH ROOMS ERROR:", err);

    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchRooms();

  const interval = setInterval(() => {
    fetchRooms();
  }, 3000);

  return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // CREATE ROOM
 const createRoom = async () => {

  if (!localStorage.getItem("token")) {
    alert("Please login first");
    return;
  }

  if (!name || !subject) {
    alert("Enter room name and subject");
    return;
  }

  try {

    const res = await API.post(
      "/study-rooms",
      {
        name,
        subject,
        goal,
      },
      getAuthConfig()
    );

    // instantly show room
    setRooms((prev) => [
      res.data,
      ...prev,
    ]);

    setName("");
    setSubject("");
    setGoal("");

    alert("Room created successfully");

  } catch (err) {

    console.log(
      "CREATE ROOM ERROR:",
      err.response?.data || err
    );

    alert(
      err.response?.data?.msg ||
      "Room creation failed"
    );
  }
};

  // JOIN ROOM
  const joinRoom = async (id) => {
  try {
    const res = await API.post(
      `/study-rooms/${id}/join`,
      {},
      getAuthConfig()
    );

    setRooms((prev) =>
      prev.map((room) =>
        room._id === id ? res.data : room
      )
    );

    alert("Joined room");
  } catch (err) {
    console.log("JOIN ROOM ERROR:", err.response?.data || err);
    alert(err.response?.data?.msg || "Join failed");
  }
};

  // JOIN BY CODE
  const joinByCode = async () => {
  if (!roomCode.trim()) {
    alert("Enter room code");
    return;
  }

  try {
    const res = await API.post(
      "/study-rooms/join/code",
      {
        roomCode: roomCode.trim(),
      },
      getAuthConfig()
    );

    setRooms((prev) => {
      const exists = prev.some(
        (room) => room._id === res.data._id
      );

      if (exists) {
        return prev.map((room) =>
          room._id === res.data._id ? res.data : room
        );
      }

      return [res.data, ...prev];
    });

    setRoomCode("");

    alert("Joined successfully");
  } catch (err) {
    console.log("JOIN CODE ERROR:", err.response?.data || err);
    alert(err.response?.data?.msg || "Invalid room code");
  }
};
  // SEND MESSAGE
  const sendMessage = async (roomId) => {
  if (!message.trim()) return;

  try {
    const res = await API.post(
      `/study-rooms/${roomId}/messages`,
      {
        text: message.trim(),
      },
      getAuthConfig()
    );

    setRooms((prev) =>
      prev.map((room) =>
        room._id === roomId ? res.data : room
      )
    );

    setMessage("");
  } catch (err) {
    console.log("MESSAGE ERROR:", err.response?.data || err);
    alert(err.response?.data?.msg || "Message failed");
  }
};
  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="glass-card p-8">

        <h1 className="text-5xl font-black mb-3">
          Multiplayer Study Room 👥
        </h1>

        <p className="opacity-70">
          Invite friends, study together,
          and chat live.
        </p>

      </div>

      {/* CREATE ROOM */}

      <div className="glass-card p-6">

        <h2 className="text-3xl font-black mb-5">
          Create Study Room ✨
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Room name"
            className="
              p-4
              rounded-2xl
              bg-white/70
              outline-none
            "
          />

          <input
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            placeholder="Subject"
            className="
              p-4
              rounded-2xl
              bg-white/70
              outline-none
            "
          />

          <input
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            placeholder="Goal"
            className="
              p-4
              rounded-2xl
              bg-white/70
              outline-none
            "
          />

          <button
            onClick={createRoom}
            className="main-btn"
          >
            <Plus size={18} />
            Create
          </button>

        </div>

      </div>

      {/* JOIN ROOM */}

      <div className="glass-card p-6">

        <h2 className="text-2xl font-black mb-4">
          Join With Invite Code
        </h2>

        <div className="flex gap-4">

          <input
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value)
            }
            placeholder="Enter room code"
            className="
              flex-1
              p-4
              rounded-2xl
              bg-white/70
              outline-none
            "
          />

          <button
            onClick={joinByCode}
            className="main-btn"
          >
            Join
          </button>

        </div>

      </div>

      {/* ROOMS */}

      <div className="grid xl:grid-cols-2 gap-6">

        {rooms.map((room) => (

          <div
            key={room._id}
            className="glass-card p-6"
          >

            {/* ROOM TOP */}

            <div className="flex justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  {room.name}
                </h2>

                <p className="opacity-70">
                  {room.subject}
                </p>

                <p className="mt-2 font-semibold">
                  Goal: {room.goal}
                </p>

              </div>

              <button
                onClick={() =>
                  joinRoom(room._id)
                }
                className="main-btn h-fit"
              >
                Join
              </button>

            </div>

            {/* MEMBERS */}

            <div className="mt-5">

              <div className="flex items-center gap-2 mb-3">

                <Users size={18} />

                <span className="font-bold">
                  {room.members?.length || 0}
                  {" "}members
                </span>

              </div>

              <div className="flex -space-x-3">

                {room.members?.map((member) => (

                  <img
                    key={member._id}
                    src={
                      member.avatar ||
                      "https://i.pinimg.com/736x/89/ea/6d/89ea6d2a31c9b3c79a9f6f7cfe5f56ff.jpg"
                    }
                    alt=""
                    className="
                      w-11
                      h-11
                      rounded-full
                      border-2
                      border-white
                      object-cover
                    "
                  />

                ))}

              </div>

            </div>

            {/* ROOM CODE */}

            <div
              className="
                mt-5
                bg-white/50
                rounded-2xl
                p-4
                flex
                justify-between
                items-center
              "
            >

              <span className="font-bold">
                Code: {room.roomCode}
              </span>

              <button
                onClick={() => {

                  navigator.clipboard.writeText(
                    room.roomCode
                  );

                  alert("Invite code copied");

                }}
                className="
                  flex
                  items-center
                  gap-2
                  font-bold
                "
              >
                <Copy size={16} />
                Copy
              </button>

            </div>

            {/* CHAT */}

            <div
              className="
                mt-6
                bg-white/50
                rounded-2xl
                p-4
              "
            >

              <h3 className="font-black mb-4">
                Room Chat 💬
              </h3>

              <div className="space-y-3 max-h-[220px] overflow-y-auto">

                {room.messages?.map((msg) => (

                  <div
                    key={msg._id}
                    className="flex gap-3"
                  >

                    <img
                      src={
                        msg.user?.avatar ||
                        "https://i.pinimg.com/736x/89/ea/6d/89ea6d2a31c9b3c79a9f6f7cfe5f56ff.jpg"
                      }
                      alt=""
                      className="
                        w-8
                        h-8
                        rounded-full
                        object-cover
                      "
                    />

                    <div>

                      <p className="font-bold text-sm">
                        {msg.user?.name || "User"}
                      </p>

                      <p className="text-sm">
                        {msg.text}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* SEND */}

              <div className="flex gap-3 mt-4">

                <input
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Type message..."
                  className="
                    flex-1
                    p-3
                    rounded-xl
                    bg-white/70
                    outline-none
                  "
                />

                <button
                  onClick={() =>
                    sendMessage(room._id)
                  }
                  className="main-btn"
                >
                  <Send size={18} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}