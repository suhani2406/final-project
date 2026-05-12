import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    alert("Account created successfully");
    navigate("/");

  } catch (err) {
    console.log(err.response?.data || err);
    alert(err.response?.data?.msg || "Registration failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="bg-white/20 bg-[#1e293b] p-10 rounded-[40px] w-[450px]">

        <h1 className="text-5xl font-bold text-[#3f2b24] mb-8">
          Create Account 🌸
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-white/20 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-white/20 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-white/20 outline-none"
          />

          <button
            onClick={handleRegister}
            className="
            w-full
            bg-[#9d5c4d]
            text-white
            py-4
            rounded-2xl
          "
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;