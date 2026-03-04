document.addEventListener("DOMContentLoaded", function() {

    // Only run AOS if it exists
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    const map = L.map('map').setView([-1.2833, 36.8167], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

});

// ==========================
// INIT AOS ANIMATIONS
// ==========================
AOS.init();


// ==========================
// INITIALIZE LEAFLET MAP
// ==========================
const map = L.map('map').setView([-1.2833, 36.8167], 13);

// Water-toned base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// ==========================
// NAIROBI RIVER PATH
// ==========================
const riverPath = [
    [-1.260, 36.850],
    [-1.270, 36.840],
    [-1.280, 36.830],
    [-1.290, 36.820],
    [-1.300, 36.810],
    [-1.310, 36.800]
];

const riverLine = L.polyline(riverPath, {
    color: "#1B4965",
    weight: 6,
    opacity: 0.85
}).addTo(map);


// ==========================
// FIVE TRACKERS
// ==========================
const trackers = [
    { 
        name: "Source Zone Sensor", 
        coords: [-1.260, 36.850], 
        status: "Excellent",
        ph: 7.1,
        turbidity: "Low"
    },
    { 
        name: "Residential Area Sensor", 
        coords: [-1.275, 36.835], 
        status: "Good",
        ph: 6.8,
        turbidity: "Moderate"
    },
    { 
        name: "CBD Monitoring Station", 
        coords: [-1.290, 36.820], 
        status: "Moderate Pollution",
        ph: 6.4,
        turbidity: "High"
    },
    { 
        name: "Industrial Zone Sensor", 
        coords: [-1.300, 36.810], 
        status: "High Pollution",
        ph: 5.9,
        turbidity: "Very High"
    },
    { 
        name: "Downstream Exit Sensor", 
        coords: [-1.310, 36.800], 
        status: "Recovering",
        ph: 6.6,
        turbidity: "Moderate"
    }
];


// ==========================
// COLOR FUNCTION
// ==========================
function getColor(status) {
    if (status === "Excellent") return "#2ECC71";
    if (status === "Good") return "#3498DB";
    if (status === "Moderate Pollution") return "#F39C12";
    if (status === "High Pollution") return "#E74C3C";
    return "#9B59B6";
}


// ==========================
// ADD TRACKERS TO MAP
// ==========================
trackers.forEach(tracker => {

    const marker = L.circleMarker(tracker.coords, {
        radius: 12,
        color: "#ffffff",
        weight: 2,
        fillColor: getColor(tracker.status),
        fillOpacity: 0.95
    }).addTo(map);

    marker.bindPopup(`
        <b>${tracker.name}</b><br><br>
        <strong>Status:</strong> ${tracker.status}<br>
        <strong>pH Level:</strong> ${tracker.ph}<br>
        <strong>Turbidity:</strong> ${tracker.turbidity}<br>
        <br><em>HYDROS-C Live Monitoring System</em>
    `);

});


// ==========================
// SMOOTH MAP FLY-IN EFFECT
// ==========================
setTimeout(() => {
    map.flyTo([-1.290, 36.820], 14, {
        duration: 3
    });
}, 1500);