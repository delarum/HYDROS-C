import React from 'react';
import "../assets/style.css";
import { Link } from "react-router-dom";  

function Footer() {
  return (
    <footer className="footer">

        <div className="footer-container">

            
            <div className="footer-section">
                <h2 className="footer-logo">🌊 HYDROS-C</h2>
                <p>
                    Leading large-scale water body cleaning and environmental
                    restoration solutions. Protecting oceans, lakes, and rivers
                    for a sustainable future.
                </p>
            </div>

        
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/partner">Partnership</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/tracker">Devices</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

            
            <div className="footer-section">
                <h3>Our Expertise</h3>
                <ul>
                    <li>Ocean Waste Removal</li>
                    <li>Lake Restoration</li>
                    <li>Oil Spill Cleanup</li>
                    <li>Industrial Water Treatment</li>
                    <li>Marine Ecosystem Protection</li>
                </ul>
            </div>

            
            <div className="footer-section">
                <h3>Contact</h3>
                <p>Email: info@hydrosc.com</p>
                <p>Phone: +254 700 000 000</p><br />
                <h3>Office Locations</h3>
                <p>Nairobi, Kenya</p>
                <p>Kigali, Rwanda</p>
                <p>Dakar, Senegal</p>
            </div>

        </div>

        
        <div className="footer-bottom">
            © 2026 HYDROS-C. All rights reserved.
        </div>

    </footer>
 );   
}

export default Footer;