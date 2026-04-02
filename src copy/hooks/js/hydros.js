import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

const riverPath = [
  [-1.237106, 36.895650],
  [-1.259893, 36.884770],
  [-1.271126, 36.807256],
  [-1.285189, 36.836010],
  [-1.287008, 36.844432],
  [-1.288827, 36.852854],
];

const trackers = [
  {
    name: "KASARANI HYC-TRK-01",
    coords: [-1.237106, 36.895650],
    status: "Moderate Pollution",
    ph: 6.4,
    turbidity: "Low",
  },
  {
    name: "EMBAKASI HYC-TRK-02",
    coords: [-1.259893, 36.884770],
    status: "Moderate Pollution",
    ph: 6.9,
    turbidity: "Moderate",
  },
  {
    name: "CHIROMO HYC-TRK-03",
    coords: [-1.271126, 36.807256],
    status: "High Pollution",
    ph: 6.4,
    turbidity: "High",
  },
  {
    name: "STAREHE HYC-TRK-04",
    coords: [-1.285189, 36.836010],
    status: "Moderate Pollution",
    ph: 5.9,
    turbidity: "Very High",
  },
  {
    name: "KAMKUNJI HYC-TRK-05",
    coords: [-1.287008, 36.844432],
    status: "Low Pollution",
    ph: 6.6,
    turbidity: "Moderate",
  },
];

function getColor(status) {
  if (status === "Low Pollution") return "#2ECC71";
  if (status === "Good") return "#3498DB";
  if (status === "Moderate Pollution") return "#F39C12";
  if (status === "High Pollution") return "#E74C3C";
  return "#9B59B6";
}

// Fly animation component
function FlyToMap() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyTo([-1.2560, 36.8572], 13, {
        duration: 3,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

function MapSection() {
  return (
    <section className="map-wrapper">
      <div className="map-section">
        <h2>The Nairobi River Basin Monitoring Map</h2>

        <div className="map-container">
          <MapContainer
            center={[-1.2833, 36.8167]}
            zoom={13}
            scrollWheelZoom={true}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline
              positions={riverPath}
              pathOptions={{
                color: "#1B4965",
                weight: 5,
                opacity: 0.85,
              }}
            />

            {trackers.map((tracker, index) => (
              <CircleMarker
                key={index}
                center={tracker.coords}
                radius={8}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: getColor(tracker.status),
                  fillOpacity: 0.95,
                }}
              >
                <Popup>
                  <div>
                    <strong>{tracker.name}</strong>
                    <br />
                    <br />
                    <strong>Status:</strong> {tracker.status}
                    <br />
                    <strong>pH Level:</strong> {tracker.ph}
                    <br />
                    <strong>Turbidity:</strong> {tracker.turbidity}
                    <br />
                    <br />
                    <em>HYDROS-C Live Monitoring System</em>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            <FlyToMap />
          </MapContainer>
        </div>

        <p className="map-description">
          Our current project is focused on the regeneration of the Nairobi River
          Basin and its tributaries. We are deploying all our resources in
          partnership with the Nairobi County Government and several NGOs to
          monitor, treat, restore and put further measures preventing the further
          degradation of this once glorious river basin.
        </p>
      </div>
    </section>
  );
}

export default MapSection;