import React from 'react';

const processSteps = [
  {
    id: 1,
    icon: "🚢",
    title: "Detection & Tracking",
    description: "Advanced satellite imaging and AI-powered drones identify garbage accumulation zones in real-time across ocean surfaces.",
    stats: "500+ zones monitored daily",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400"
  },
  {
    id: 2,
    icon: "🕸️",
    title: "Collection",
    description: "Specialized vessels deploy custom-designed nets and conveyor systems to collect floating debris without harming marine life.",
    stats: "95% marine-life safe",
    image: "https://images.unsplash.com/photo-1618477461853-5f8dd68aa295?w=400"
  },
  {
    id: 3,
    icon: "♻️",
    title: "Sorting & Processing",
    description: "Collected materials are sorted by type at sea. Plastics are cleaned, shredded, and prepared for recycling onshore.",
    stats: "12 material types sorted",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
  },
  {
    id: 4,
    icon: "🏭",
    title: "Recycling & Manufacturing",
    description: "Processed plastics are transformed into high-quality raw materials and crafted into durable, sustainable consumer products.",
    stats: "85% recycling rate",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  }
];

function CollectionProcess({ isVisible }) {
  return (
    <section className="collection-process" id="process" data-animate>
      <div className={`process-header ${isVisible['process'] ? 'visible' : ''}`}>
        <span className="section-badge">Our Process</span>
        <h2 className="section-title">From Ocean to Product</h2>
        <p className="section-subtitle">
          Discover how we transform harmful ocean plastic into beautiful, 
          functional products you can use every day.
        </p>
      </div>

      <div className="process-timeline">
        {processSteps.map((step, index) => (
          <div 
            key={step.id}
            className={`process-card ${isVisible['process'] ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className="card-number">0{step.id}</div>
            <div className="card-visual">
              <img src={step.image} alt={step.title} />
              <div className="card-icon">{step.icon}</div>
            </div>
            <div className="card-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="card-stat">
                <i className="fas fa-check-circle"></i>
                {step.stats}
              </div>
            </div>
            {index < processSteps.length - 1 && (
              <div className="connector">
                <div className="connector-line"></div>
                <div className="connector-arrow">→</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`process-impact ${isVisible['process'] ? 'visible' : ''}`}>
        <div className="impact-grid">
          <div className="impact-item">
            <span className="impact-number">0%</span>
            <span className="impact-desc">Ocean Plastic Waste</span>
          </div>
          <div className="impact-arrow">→</div>
          <div className="impact-item">
            <span className="impact-number">100%</span>
            <span className="impact-desc">Premium Raw Material</span>
          </div>
          <div className="impact-arrow">→</div>
          <div className="impact-item">
            <span className="impact-number">∞</span>
            <span className="impact-desc">Sustainable Products</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionProcess;