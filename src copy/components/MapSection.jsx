import React from "react";

function MapSection() {
  return (
    <section className="map-wrapper">
      <div className="map-section">
        <h2>The Nairobi River Basin Monitoring Map</h2>

        <div id="map"></div>

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