import { useContext, useState } from "react";
// import { assets } from "../assets/assets";
import { IoIosPerson } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data?.message || "An error occurred");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-red-400">
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer rounded"
      /> */}
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-xs mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center w-full px-5 py-2.5 rounded-full bg-[#333a5c] mb-4 gap-3">
              <IoIosPerson />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                required
                className="bg-transparent focus:outline-none text-white w-full"
              />
            </div>
          )}

          <div className="flex items-center w-full px-5 py-2.5 rounded-full bg-[#333a5c] mb-4 gap-3">
            <CiMail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              className="bg-transparent focus:outline-none text-white w-full"
            />
          </div>

          {/* Password Field with Show/Hide */}
          <div className="relative flex items-center w-full px-5 py-2.5 rounded-full bg-[#333a5c] mb-4 gap-3">
            <FaLock />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password"
              required
              className="bg-transparent focus:outline-none text-white w-full pr-8"
            />
            <div
              className="absolute right-5 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="cursor-pointer mb-4 text-indigo-500"
          >
            forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-red-500 to-blue-900 font-medium text-white cursor-pointer">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-center mt-4 text-xs text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
