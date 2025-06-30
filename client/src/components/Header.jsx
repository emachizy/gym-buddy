import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/profile-setup");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    console.log("User Data Updated:", userData);
  }, [userData]); // Runs whenever userData changes

  return (
    <>
      <div className="mt-28 flex flex-col items-center px-4 text-center text-gray-800 gap-4">
        <img
          src={assets.header_bg}
          alt="header image"
          className="w-36 h-36 rounded-full mb-6 object-cover"
          onClick={() => navigate("/")}
        />
        <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium">
          Hey {userData ? userData.name : "Buddy"} 👋
        </h1>
        <h2 className="text-3xl sm:text-5xl font-semibold">
          Welcome to our app
        </h2>
        <p className="max-w-md">
          Let us start with a quick product tour, and we will have you up and
          running in no time!
        </p>
        <button
          onClick={handleGetStarted}
          className="cursor-pointer border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all "
        >
          Get Started
        </button>
      </div>

      {/* another */}
    </>
  );
};

export default Header;
