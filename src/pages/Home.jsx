import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";
import "../assets/style.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MapSection />
      <Footer />
    </>
  );
}

export default Home;