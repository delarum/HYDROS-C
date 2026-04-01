import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";
import "../assets/style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Prominent Shop CTA Section */}
      <section className="shop-cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <span className="cta-badge">🌊 Ocean Positive</span>
            <h2>Turn Garbage into Gold</h2>
            <p>Shop products made from 100% recycled ocean plastic. Every purchase removes trash from our water bodies.</p>
            <Link to="/shop" className="shop-link-btn">
              <i className="fas fa-shopping-bag"></i>
              Visit Garbage Shop
              <span className="arrow">→</span>
            </Link>
          </div>
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-num">125K kg</span>
              <span className="stat-label">Garbage Collected</span>
            </div>
            <div className="stat">
              <span className="stat-num">850K</span>
              <span className="stat-label">Items Recycled</span>
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <Footer />
    </>
  );
}

export default Home;