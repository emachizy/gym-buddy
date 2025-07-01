import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { backendUrl } = useContext(AppContent);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          method: "GET",
          credentials: "include",
        });
        setProfile(data.profileData);
        toast.success("Profile fetched successfully!");
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to fetch profile. Please try again later.");
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-red-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
        <div>
          <b>Name:</b> {profile.name}
        </div>
        <div>
          <b>Email:</b> {profile.email}
        </div>
        <div>
          <b>Fitness Goal:</b> {profile.fitnessGoal}
        </div>
        <div>
          <b>Preferred Time:</b> {profile.preferredTime}
        </div>
        <div>
          <b>Availability:</b> {profile.availability?.join(", ")}
        </div>
        <div>
          <b>Location:</b>{" "}
          {profile.location?.coordinates
            ? `${profile.location.coordinates[1]}, ${profile.location.coordinates[0]}`
            : "Not set"}
        </div>
        <div>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/profile-setup")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
