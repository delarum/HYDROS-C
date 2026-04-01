import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    totalPrice,
    totalGarbageRemoved 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>
            <i className="fas fa-shopping-bag"></i>
            Your Cart
          </h3>
          <button className="close-cart" onClick={closeCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🌊</div>
            <p>Your cart is empty</p>
            <span>Fill it with ocean-saving products!</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-impact">
                      <i className="fas fa-leaf"></i>
                      -{item.garbageRemoved}kg per item
                    </div>
                    <div className="item-price">${item.price}</div>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="impact-summary">
                <div className="impact-icon">🌊</div>
                <div className="impact-text">
                  <span className="impact-label">Ocean Impact</span>
                  <span className="impact-value">
                    {totalGarbageRemoved.toFixed(2)}kg of plastic removed
                  </span>
                </div>
              </div>

              <div className="cart-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span className="free">FREE</span>
                </div>
                <div className="total-row grand">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-btn">
                <i className="fas fa-lock"></i>
                Checkout
              </button>
              
              <button className="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;