import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product, index }) {
  const { addToCart, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    
    // Small delay before opening cart for better UX
    setTimeout(() => openCart(), 300);
  };

  return (
    <div 
      className="product-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product-image-wrapper">
        <div className={`image-skeleton ${imageLoaded ? 'hidden' : ''}`}></div>
        <img 
          src={product.image} 
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="product-badges">
          <span className="badge eco">♻️ Eco</span>
          <span className="badge impact">
            <i className="fas fa-weight-hanging"></i>
            -{product.garbageRemoved}kg
          </span>
        </div>
        <div className="product-overlay">
          <button 
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <>
                <i className="fas fa-check"></i>
                Added!
              </>
            ) : (
              <>
                <i className="fas fa-shopping-bag"></i>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <span>{product.rating}</span>
            <span className="reviews">({product.reviews})</span>
          </div>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="product-price">
            <span className="currency">$</span>
            <span className="amount">{product.price}</span>
          </div>
          <div className="impact-tag">
            <i className="fas fa-water"></i>
            Removes {product.garbageRemoved}kg of ocean plastic
          </div>
        </div>
      </div>

      {/* Progress bar showing impact */}
      <div className="impact-bar">
        <div 
          className="impact-fill"
          style={{ width: `${(product.garbageRemoved / 2.5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProductCard;