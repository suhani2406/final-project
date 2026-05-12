import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {

    const res = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    // TOKEN
    localStorage.setItem(
      "token",
      res.data.token
    );

    // USER DATA
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    navigate("/notes");

  } catch (err) {

    console.log(err);

    alert("Login failed");
  }
};

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* LEFT IMAGE SECTION */}

      <div className="w-1/2 relative hidden lg:block">

        <img
          src="https://media.craiyon.com/2025-04-05/Ms2Ejq1TRGm_JUGsasbnqA.webp"
          alt="anime"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute bottom-20 left-16 z-10 max-w-lg">

          <h1 className="text-6xl font-bold text-white leading-tight drop-shadow-2xl">
            Organize Your Dreams 🌸
          </h1>

          <p className="text-white/80 mt-6 text-xl leading-9">
            Build notes, ideas, and beautiful productivity
            systems inside your peaceful workspace.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        className="
        flex-1
        bg-white/10
        bg-[#1e293b]
        flex
        items-center
        justify-center
        relative
        overflow-hidden
      "
      >

        {/* GLOW */}

        <div className="absolute w-[500px] h-[500px] bg-[#f5d0c5]/30 rounded-full blur-3xl top-[-100px] right-[-100px]"></div>

        {/* LOGIN CARD */}

        <div
          className="
          relative
          z-10
          w-[480px]
          bg-white/20
          bg-[#1e293b]
          border border-white/20
          rounded-[40px]
          shadow-[0_10px_60px_rgba(0,0,0,0.12)]
          p-10
        "
        >

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-[#3f2b24]">
              Welcome Back
            </h1>

            <p className="text-[#725f57] mt-4 text-lg">
              Continue your beautiful journey ✨
            </p>

          </div>

          {/* EMAIL */}

          <div className="mb-6">

            <label className="text-[#5f514b] text-sm mb-2 block">
              Email
            </label>

            <div
              className="
              flex
              items-center
              gap-3
              bg-white/20
              border border-white/10
              rounded-2xl
              px-5
              py-4
            "
            >

              <Mail className="text-[#8b6f65]" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                bg-transparent
                outline-none
                w-full
                text-[#3f2b24]
                placeholder:text-[#8b6f65]
              "
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mb-4">

            <label className="text-[#5f514b] text-sm mb-2 block">
              Password
            </label>

            <div
              className="
              flex
              items-center
              gap-3
              bg-white/20
              border border-white/10
              rounded-2xl
              px-5
              py-4
            "
            >

              <Lock className="text-[#8b6f65]" size={20} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                bg-transparent
                outline-none
                w-full
                text-[#3f2b24]
                placeholder:text-[#8b6f65]
              "
              />

            </div>

          </div>

          {/* FORGOT PASSWORD */}

          <div className="flex justify-end mb-8">

            <button className="text-[#9d5c4d] hover:underline text-sm">
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            className="
            w-full
            bg-[#9d5c4d]
            hover:bg-[#8a4d40]
            transition
            text-white
            py-4
            rounded-2xl
            text-lg
            font-semibold
            shadow-xl
          "
          >
            Sign In
          </button>

          {/* SIGNUP */}

          <div className="text-center mt-8">

            <p className="text-[#5f514b]">
              Don’t have an account?
            </p>
<Link
  to="/register"
  className="
  mt-3
  inline-block
  text-[#9d5c4d]
  font-semibold
  hover:underline
"
>
  Create Account
</Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;