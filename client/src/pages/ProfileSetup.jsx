import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ProfileSetup = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fitnessGoal: "",
    preferredTime: "",
    availability: [],
    location: { lat: "", lng: "" },
    manualLocation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const toggleAvailability = (day) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm((prev) => ({
          ...prev,
          location: { lat: coords.latitude, lng: coords.longitude },
        }));
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

    const { fitnessGoal, preferredTime, availability, location } = form;

    if (!location.lat || !location.lng) {
      toast.error("Please use 'Use My Location' to set your location.");
      return;
    }

    const payload = {
      fitnessGoal,
      preferredTime,
      availability,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    };

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/setup-profile`,
        payload
      );

      if (data.success) {
        toast.success("Profile setup complete!");
        navigate("/profile");
      } else {
        toast.error(data.message || "Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile.");
    } finally {
      setIsSubmitting(false);
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

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Fitness Goal
          </label>
          <select
            className="w-full p-2 border rounded"
            value={form.fitnessGoal}
            onChange={handleChange("fitnessGoal")}
            required
          >
            <option value="">-- Select a goal --</option>
            <option value="lose_weight">Lose Weight</option>
            <option value="build_muscle">Build Muscle</option>
            <option value="stay_active">Stay Active</option>
            <option value="endurance">Improve Endurance</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Preferred Workout Time
          </label>
          <select
            className="w-full p-2 border rounded"
            value={form.preferredTime}
            onChange={handleChange("preferredTime")}
            required
          >
            <option value="">-- Select time --</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">
            Available Days
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleAvailability(day)}
                className={`px-3 py-1 rounded-full border transition ${
                  form.availability.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">
            Location
          </label>
          <div className="flex gap-2">
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
              value={form.manualLocation}
              onChange={handleChange("manualLocation")}
              className="flex-1 p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
