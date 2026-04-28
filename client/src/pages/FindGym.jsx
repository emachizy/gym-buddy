import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
// import { AppContent } from "../context/AppContext";

const gymIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const FindGym = () => {
  const { userData } = useContext(AppContent);
  const [position, setPosition] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [search, setSearch] = useState("");

  // Helper to use profile location
  const useProfileLocation = () => {
    const coords = userData?.location?.coordinates;
    if (coords && coords.length === 2) {
      const [lon, lat] = coords;
      setPosition([lat, lon]);
      fetchGyms(lat, lon);
      return true;
    }
    return false;
  };

  // Helper to use browser location
  const useBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        fetchGyms(coords.latitude, coords.longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        toast.error("Location access denied.");
      }
    );
  };

  // Determine initial location
  useEffect(() => {
    if (!useProfileLocation()) {
      useBrowserLocation();
    }
  }, [userData]);

  // Fetch gyms using Overpass API
  const fetchGyms = async (lat, lon) => {
    const query = `
      [out:json];
      (
        node["leisure"="fitness_centre"](around:5000,${lat},${lon});
        node["amenity"="gym"](around:5000,${lat},${lon});
      );
      out body;
    `;

    try {
      const overpassUrl = "https://overpass-api.de/api/interpreter";
      const params = new URLSearchParams();
      params.append("data", query);

      // Use GET request to avoid CORS issues
      const { data } = await axios.get(`${overpassUrl}?${params.toString()}`);
      setGyms(data.elements || []);
    } catch (error) {
      console.error("Failed to fetch gyms:", error);
      toast.error("Could not load gyms.");
    }
  };

  const filteredGyms = gyms.filter((gym) =>
    gym.tags?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-100 to-red-200 pt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Find a Gym Near You
      </h2>

      <input
        type="text"
        placeholder="Search gyms by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto block mb-4 p-2 border rounded"
      />

      {position ? (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {userData?.location ? "Your saved location" : "You are here"}
            </Popup>
          </Marker>
          {filteredGyms.map((gym) => (
            <Marker key={gym.id} position={[gym.lat, gym.lon]} icon={gymIcon}>
              <Popup>{gym.tags?.name || "Unnamed Gym"}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-center">Getting your location...</p>
      )}
    </div>
  );
};

export default FindGym;
