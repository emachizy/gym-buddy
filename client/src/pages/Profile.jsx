import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left text-sm transition-colors ${
      active
        ? "bg-gray-100 font-medium text-gray-900"
        : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    <div className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center flex-shrink-0 text-gray-600">
      {icon}
    </div>
    {label}
  </button>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="text-sm text-gray-800">{value || "—"}</p>
  </div>
);

const Profile = () => {
  const { backendUrl } = useContext(AppContent);
  const [profile, setProfile] = useState(null);
  const [locationName, setLocationName] = useState("Loading...");
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate();

  const reverseGeocode = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        "https://us1.locationiq.com/v1/reverse",
        {
          params: {
            key: "pk.d6cce5c19823ae9a4287430169544bd2",
            lat,
            lon,
            format: "json",
          },
        },
      );

      // data.address contains structured fields — much cleaner than display_name
      const { city, town, village, state, country } = data.address;
      const place = city || town || village || state || "";
      setLocationName(
        place && country
          ? `${place}, ${country}`
          : country || "Unknown location",
      );
    } catch (error) {
      console.error("LocationIQ reverse geocoding failed:", error);
      setLocationName("Unknown location");
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/profile`);
        setProfile(data.profileData);
        const coords = data.profileData.location?.coordinates;
        if (coords?.length === 2) {
          const [lon, lat] = coords;
          reverseGeocode(lat, lon);
        } else {
          setLocationName("Not set");
        }
      } catch {
        toast.error("Failed to fetch profile.");
      }
    };
    fetchProfile();
  }, []);

  const initials = profile?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isProfileComplete =
    profile?.fitnessGoal &&
    profile?.preferredTime &&
    profile?.availability?.length;

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-4 py-10 mt-28">
      <div className="max-w-4xl mx-auto grid grid-cols-[240px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <h1 className="text-2xl font-semibold text-gray-900 mb-5">Profile</h1>
          <nav className="space-y-1">
            <NavItem
              active={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              label="About me"
              icon={
                <span className="w-full h-full rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
                  {initials}
                </span>
              }
            />
            <NavItem
              active={activeTab === "trips"}
              onClick={() => setActiveTab("trips")}
              label="Past trips"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              }
            />
            <NavItem
              active={activeTab === "connections"}
              onClick={() => setActiveTab("connections")}
              label="Connections"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="15" cy="8" r="3" />
                  <path d="M2 20c0-4 3-6 7-6M15 14c4 0 7 2 7 6" />
                </svg>
              }
            />
          </nav>
        </aside>

        {/* Main */}
        <main>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-900">About me</h2>
            <button
              onClick={() => navigate("/profile-setup")}
              className="text-sm px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Avatar card */}
          <div className="border border-gray-200 rounded-2xl p-6 flex items-center gap-5 mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-3xl font-medium flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {profile.name}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">Guest</p>
            </div>
          </div>

          {/* Complete profile banner */}
          {!isProfileComplete && (
            <div className="bg-gray-50 rounded-xl px-5 py-4 flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Complete your profile
                </p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Your profile helps hosts and guests get to know you. Fill in
                  the details below.
                </p>
              </div>
              <button
                onClick={() => navigate("/profile-setup")}
                className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap"
              >
                Get started
              </button>
            </div>
          )}

          <hr className="border-gray-100 my-5" />

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <InfoItem label="Fitness goal" value={profile.fitnessGoal} />
            <InfoItem label="Preferred time" value={profile.preferredTime} />
            <InfoItem
              label="Availability"
              value={profile.availability?.join(", ")}
            />
            <InfoItem label="Location" value={locationName} />
          </div>

          <hr className="border-gray-100 my-5" />

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-3.5 h-3.5"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            Reviews I&apos;ve written
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
