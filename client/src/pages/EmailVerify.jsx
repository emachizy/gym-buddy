import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContent);

  const inputRefs = React.useRef([]);

  const handleInput = (e, i) => {
    if (e.target.value.length > 0 && i < inputRefs.current.length - 1) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && e.target.value === "" && i > 0) {
      inputRefs.current[i - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArr = paste.split("");
    pasteArr.forEach((char, i) => {
      inputRefs.current[i].value = char;
    });
    // for (let i = 0; i < paste.length; i++) {
    //   inputRefs.current[i].value = paste[i];
    // }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const optArr = inputRefs.current.map((e) => e.value);
      const otp = optArr.join("");

      const { data } = await axios.post(
        backendUrl + "api/auth/verify-account",
        {
          otp,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData?.isVerified && navigate("/");
  }, [isLoggedin, userData, navigate]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-red-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill()
            .map((_, i) => (
              <input
                type="text"
                maxLength="1"
                key={i}
                required
                className="w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[i] = e)}
                onInput={(e) => handleInput(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:from-indigo-900 hover:to-indigo-500">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
