import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, collectionStats } from '../data/products';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import ImpactTracker from '../components/ImpactTracker';
import CollectionProcess from '../components/CollectionProcess';
import '../assets/garbage-shop.css';

function GarbageShop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const { totalItems, openCart, totalGarbageRemoved } = useCart();

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="garbage-shop">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="hero-content">
          <div className="hero-badge">🌊 Ocean Positive</div>
          <h1 className="hero-title">
            Turn <span className="gradient-text">Garbage</span> into Gold
          </h1>
          <p className="hero-subtitle">
            Every purchase removes plastic from our oceans. Shop products made from 
            100% recycled marine debris and track your environmental impact in real-time.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{collectionStats.totalCollected.toLocaleString()}kg</span>
              <span className="stat-label">Garbage Collected</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{collectionStats.itemsRecycled.toLocaleString()}</span>
              <span className="stat-label">Items Recycled</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{collectionStats.activeVessels}</span>
              <span className="stat-label">Active Vessels</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-items">
            <div className="float-item bottle">🍶</div>
            <div className="float-item net">🕸️</div>
            <div className="float-item bag">🛍️</div>
            <div className="float-item flipflop">🩴</div>
          </div>
          <div className="garbage-pile">
            <div className="pile-layer layer-1"></div>
            <div className="pile-layer layer-2"></div>
            <div className="pile-layer layer-3"></div>
            <div className="pile-glow"></div>
          </div>
        </div>
      </section>

      {/* Impact Tracker Bar */}
      <ImpactTracker />

      {/* Collection Process Section */}
      <CollectionProcess isVisible={isVisible} />

      {/* Shop Section */}
      <section className="shop-section" id="shop" data-animate>
        <div className="shop-header">
          <h2 className="section-title">Shop Sustainable</h2>
          <p className="section-subtitle">Products that clean our oceans</p>
        </div>

        {/* Filters */}
        <div className="shop-filters">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>No products found. Try a different search.</p>
          </div>
        )}
      </section>

      {/* Cart Floating Button */}
      <button className="cart-fab" onClick={openCart}>
        <i className="fas fa-shopping-bag"></i>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        {totalGarbageRemoved > 0 && (
          <span className="garbage-indicator">
            -{totalGarbageRemoved.toFixed(2)}kg
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <Cart />

      {/* CTA Section */}
      <section className="shop-cta">
        <div className="cta-content">
          <h2>Join the Cleanup Revolution</h2>
          <p>Every item purchased funds the removal of 1kg of ocean plastic</p>
          <Link to="/" className="cta-button">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}

export default GarbageShop;