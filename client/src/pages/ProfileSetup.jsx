import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const ProfileSetup = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [availability, setAvailability] = useState([]);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [manualLocation, setManualLocation] = useState("");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleAvailability = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        toast.success("Location captured!");
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Location permission denied. Enter manually.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.lat || !location.lng) {
      toast.error("Please use 'Use My Location' to set your location.");
      return;
    }

    const finalLocation = {
      type: "Point",
      coordinates: [location.lng, location.lat],
    };

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/setup-profile`,
        {
          fitnessGoal,
          preferredTime,
          availability,
          location: finalLocation,
        }
      );

      if (data.success) {
        toast.success("Profile setup complete!");
        navigate("/profile"); // Redirect to profile page
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error saving profile.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-red-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">
          Fitness Goal
        </label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
          required
        >
          <option value="">-- Select a goal --</option>
          <option value="lose_weight">Lose Weight</option>
          <option value="build_muscle">Build Muscle</option>
          <option value="stay_active">Stay Active</option>
          <option value="endurance">Improve Endurance</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">
          Preferred Workout Time
        </label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          required
        >
          <option value="">-- Select time --</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">
          Available Days
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleAvailability(day)}
              className={`px-3 py-1 rounded-full border ${
                availability.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <label className="block mb-2 text-gray-700 font-medium">Location</label>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={getGeolocation}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Use My Location
          </button>
          <input
            type="text"
            placeholder="Or enter your area"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold cursor-pointer hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
