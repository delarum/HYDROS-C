// run code after HTML finishes loading(event propagation)
document.addEventListener("DOMContentLoaded", function () {

    // Only run AOS animation library if it exists
    if (typeof AOS !== "undefined") {
        AOS.init();
    }
    //create a map container/object that is L.map to hold the tiles
    const map = L.map('map').setView([-1.2833, 36.8167], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

});

// INIT AOS ANIMATIONS
AOS.init();


const map = L.map('map').setView([-1.2833, 36.8167], 13);// view of the whole map

// add leaflet line to display map on page website, tilelayer places map tiles to make up the whole map
// FETCH MAP TILES FROM OPEN STREETMAP
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'//ADD credits to the map
}).addTo(map);


// NAIROBI RIVER PATH using coordinates
const riverPath = [
    [-1.237106, 36.895650],
    [-1.259893, 36.884770],
    [-1.271126, 36.807256],
    [-1.285189, 36.836010],
    [-1.287008, 36.844432],
    [-1.288827, 36.852854],


];

const riverLine = L.polyline(riverPath, {
    color: "#1B4965",
    weight: 5,
    opacity: 0.85
}).addTo(map);


// FIVE TRACKERS content
const trackers = [
    {
        name: "KASARANI HYC-TRK-01",
        coords: [-1.237106, 36.895650],
        status: "Moderate pollution",
        ph: 6.4,
        turbidity: "Low"
    },
    {
        name: "EMBAKASI HYC-TRK-02",
        coords: [-1.259893, 36.884770],
        status: "Moderate Pollution",
        ph: 6.9,
        turbidity: "Moderate"
    },
    {
        name: "CHIROMO HYC-TRK-03",
        coords: [-1.271126, 36.807256],
        status: "High Pollution",
        ph: 6.4,
        turbidity: "High"
    },
    {
        name: "STAREHE HYC-TRK-04",
        coords: [-1.285189, 36.836010],
        status: "Morderate Pollution",
        ph: 5.9,
        turbidity: "Very High"
    },
    {
        name: "KAMKUNJI HYC-TRK-05",
        coords: [-1.287008, 36.844432],
        status: "Low Pollution",
        ph: 6.6,
        turbidity: "Moderate"
    }
];


// COLORS
function getColor(status) {
    if (status === "Low Pollution") return "#2ECC71";
    if (status === "Good") return "#3498DB";
    if (status === "Moderate Pollution") return "#F39C12";
    if (status === "High Pollution") return "#E74C3C";
    return "#9B59B6";
}


// ADD TRACKERS TO MAP

trackers.forEach(tracker => {

    const marker = L.circleMarker(tracker.coords, {
        radius: 8,
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


// FLY-IN EFFECT

setTimeout(() => {
    map.flyTo([-1.2560, 36.8572], 13, {
        duration: 3
    });
}, 1500);