import React from 'react';
import { useCart } from '../context/CartContext';
import { collectionStats } from '../data/products';

function ImpactTracker() {
  const { totalGarbageRemoved } = useCart();
  
  // Calculate percentage of garbage pile "cleaned" (visual representation)
  const maxVisualGarbage = 50; // kg for visual scale
  const cleanedPercentage = Math.min((totalGarbageRemoved / maxVisualGarbage) * 100, 100);
  const remainingGarbage = Math.max(maxVisualGarbage - totalGarbageRemoved, 0);

  return (
    <div className="impact-tracker">
      <div className="tracker-content">
        <div className="tracker-header">
          <h3>
            <i className="fas fa-chart-line"></i>
            Live Impact Tracker
          </h3>
          <span className="live-indicator">
            <span className="pulse"></span>
            LIVE
          </span>
        </div>

        <div className="tracker-visual">
          <div className="garbage-pile-visual">
            <div className="pile-container">
              <div 
                className="cleaned-section"
                style={{ height: `${cleanedPercentage}%` }}
              >
                <div className="cleaned-wave"></div>
                <span className="cleaned-label">
                  {totalGarbageRemoved.toFixed(2)}kg Cleaned
                </span>
              </div>
              <div 
                className="remaining-section"
                style={{ height: `${100 - cleanedPercentage}%` }}
              >
                <span className="remaining-label">
                  {remainingGarbage.toFixed(2)}kg Remaining
                </span>
              </div>
            </div>
            <div className="pile-base">Ocean Garbage Pile</div>
          </div>

          <div className="tracker-metrics">
            <div className="metric-card">
              <div className="metric-icon">🗑️</div>
              <div className="metric-data">
                <span className="metric-value">{totalGarbageRemoved.toFixed(2)}kg</span>
                <span className="metric-label">Plastic Removed</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🐟</div>
              <div className="metric-data">
                <span className="metric-value">{(totalGarbageRemoved * 2).toFixed(0)}</span>
                <span className="metric-label">Marine Lives Saved</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🌊</div>
              <div className="metric-data">
                <span className="metric-value">{(totalGarbageRemoved * 10).toFixed(0)}m²</span>
                <span className="metric-label">Ocean Area Cleaned</span>
              </div>
            </div>
            <div className="metric-card global">
              <div className="metric-icon">🌍</div>
              <div className="metric-data">
                <span className="metric-value">{collectionStats.totalCollected.toLocaleString()}kg</span>
                <span className="metric-label">Global Total Collected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tracker-message">
          {totalGarbageRemoved === 0 ? (
            <p>Start shopping to see your impact on ocean cleanup!</p>
          ) : totalGarbageRemoved < 1 ? (
            <p>Great start! You've removed {totalGarbageRemoved.toFixed(2)}kg of ocean plastic.</p>
          ) : (
            <p>Amazing! You've cleaned {totalGarbageRemoved.toFixed(2)}kg of garbage from our oceans!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImpactTracker;