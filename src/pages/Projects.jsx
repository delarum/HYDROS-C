import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/projects.css";

const projectsData = [
  {
    id: 1,
    category: ["lake", "active"],
    status: "Critical Priority",
    location: "Tanzania, Uganda, Kenya",
    title: "Lake Victoria Basin",
    description:
      "Africa's largest freshwater lake faces severe eutrophication from agricultural runoff and urban waste. Our AI-powered monitoring tracks algal blooms across 68,800 km².",
    image:
      "https://kimi-web-img.moonshot.cn/img/gda.esa.int/8efa95f8782899872bd20504cb9a60415e00e3a7.jpg",
    metrics: [
      { value: 68, label: "Monitoring Buoys" },
      { value: 42, label: "% Pollution Reduced" },
      { value: 3, label: "Countries" },
    ],
  },
  {
    id: 2,
    category: ["river", "active"],
    status: "Regeneration Phase",
    location: "Nairobi, Kenya",
    title: "Nairobi River Basin",
    description:
      "Comprehensive regeneration of the Nairobi River and its tributaries. Real-time sensors detect industrial discharge and plastic waste accumulation across 12 tributaries.",
    image:
      "https://kimi-web-img.moonshot.cn/img/www.greenpeace.org/511cf9db53c83216e4f463b48f11a7c2ed8be5dd.png",
    metrics: [
      { value: 24, label: "/7 Monitoring" },
      { value: 12, label: "Tributaries" },
      { value: 85, label: "% Accuracy" },
    ],
  },
  {
    id: 3,
    category: ["river"],
    status: "Expansion Phase",
    location: "Democratic Republic of Congo",
    title: "Congo River System",
    description:
      "The world's deepest river faces mounting plastic pollution. Deploying autonomous drones and sensor networks across 4,700 km of waterways.",
    image:
      "https://kimi-web-img.moonshot.cn/img/assets.weforum.org/14f5c2f39c9a24cccc101e6b192b5e708862eebd.jpg",
    metrics: [
      { value: 15, label: "Sensor Stations" },
      { value: 4700, label: "Km Covered" },
      { value: 8, label: "Drones" },
    ],
  },
  {
    id: 4,
    category: ["lake"],
    status: "Climate Critical",
    location: "Chad, Nigeria, Niger, Cameroon",
    title: "Lake Chad Basin",
    description:
      "Once the world's sixth-largest lake, now 90% diminished. Implementing sustainable water management and drought monitoring across the Sahel region.",
    image:
      "https://kimi-web-img.moonshot.cn/img/africarenewal.un.org/b8deb1469d2f352abe7ff8d3f76b4100c421d337.jpg",
    metrics: [
      { value: 4, label: "Nations" },
      { value: 90, label: "% Water Loss" },
      { value: 35, label: "Million People" },
    ],
  },
  {
    id: 5,
    category: ["river", "active"],
    status: "Oil Remediation",
    location: "Nigeria, West Africa",
    title: "Niger River Delta",
    description:
      "Addressing decades of oil spill contamination affecting 20,000 km² of wetlands. Bioremediation and real-time hydrocarbon detection systems deployed.",
    image:
      "https://kimi-web-img.moonshot.cn/img/science.time.com/1b48bf6827ba408b2e6c4d63802d3896e320d4c9.jpg",
    metrics: [
      { value: 20000, label: "Km² Affected" },
      { value: 12, label: "Spill Sites" },
      { value: 4500, label: "Plant Species" },
    ],
  },
  {
    id: 6,
    category: ["lake"],
    status: "Biodiversity Focus",
    location: "Burundi, Tanzania, DRC, Zambia",
    title: "Lake Tanganyika",
    description:
      "The world's longest freshwater lake faces sedimentation and overfishing. Protecting 2,000+ endemic species through smart monitoring and sustainable fishing protocols.",
    image:
      "https://kimi-web-img.moonshot.cn/img/imgs.mongabay.com/f74c9cc1843ff691a0a9fb7afa6ba04c16cad9be.jpg",
    metrics: [
      { value: 2000, label: "Endemic Species" },
      { value: 673, label: "Km Length" },
      { value: 28, label: "Conservation Zones" },
    ],
  },
  {
    id: 7,
    category: ["river", "active"],
    status: "Industrial Monitoring",
    location: "Zambia, Zimbabwe, Mozambique",
    title: "Zambezi River Basin",
    description:
      "Monitoring Africa's fourth-largest river system for mining runoff and industrial waste. Protecting the Victoria Falls ecosystem and downstream communities through real-time water quality assessment.",
    image:
      "https://kimi-web-img.moonshot.cn/img/cdn.thestandard.co.zw/223389274fff2d5074001ee91812ab3572a7103f.jpg",
    metrics: [
      { value: 2574, label: "Km Monitored" },
      { value: 32, label: "Mining Sites" },
      { value: 6, label: "Countries" },
    ],
  },
];

function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Number(start.toFixed(target % 1 !== 0 ? 1 : 0)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projectsData;
    return projectsData.filter((project) => project.category.includes(filter));
  }, [filter]);

  useEffect(() => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${8 + Math.random() * 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.width = `${4 + Math.random() * 6}px`;
      particle.style.height = particle.style.width;

      particlesContainer.appendChild(particle);
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="projects-page">
        <div className="ocean-bg">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="particles" id="particles"></div>

        <section className="projects-section">
          {/* Header */}
          <div className="section-header">
            <div className="header-badge">
              <span>Active Restoration Sites</span>
            </div>

            <h1 className="section-title">
              Seven Critical <span>Water Bodies</span>
            </h1>
          </div>

          {/* Filters */}
          <div className="filter-container">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>

            <button
              className={`filter-btn ${filter === "lake" ? "active" : ""}`}
              onClick={() => setFilter("lake")}
            >
              Great Lakes
            </button>

            <button
              className={`filter-btn ${filter === "river" ? "active" : ""}`}
              onClick={() => setFilter("river")}
            >
              River Basins
            </button>

            <button
              className={`filter-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active Monitoring
            </button>
          </div>

          {/* Cards */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="card-image">
                  <img src={project.image} alt={project.title} />
                  <div className="card-overlay"></div>

                  <div className="status-badge">
                    <span className="status-dot"></span>
                    {project.status}
                  </div>
                </div>

                <div className="card-content">
                  <div className="location-tag">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{project.location}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>

                  <p className="project-description">{project.description}</p>

                  <div className="metrics">
                    {project.metrics.map((metric, index) => (
                      <div className="metric" key={index}>
                        <span className="metric-value">
                          <AnimatedNumber target={metric.value} />
                        </span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="progress-bar"></div>
              </div>
            ))}
          </div>

          {/* Impact Section */}
          <div className="impact-section">
            <div className="impact-header">
              <h2>Collective Impact</h2>
              <p>Measurable results across seven critical ecosystems</p>
            </div>

            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">
                  <i className="fas fa-tint"></i>
                </div>
                <div className="impact-number">
                  <AnimatedNumber target={1.2} suffix="M" />
                </div>
                <div className="impact-label">Million Liters Treated Daily</div>
              </div>

              <div className="impact-item">
                <div className="impact-icon">
                  <i className="fas fa-satellite-dish"></i>
                </div>
                <div className="impact-number">
                  <AnimatedNumber target={156} />
                </div>
                <div className="impact-label">Active IoT Sensors</div>
              </div>

              <div className="impact-item">
                <div className="impact-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="impact-number">
                  <AnimatedNumber target={45} />
                </div>
                <div className="impact-label">Million People Protected</div>
              </div>

              <div className="impact-item">
                <div className="impact-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="impact-number">
                  <AnimatedNumber target={8500} />
                </div>
                <div className="impact-label">Species Under Protection</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="join-section">
            <h3>Join the Restoration</h3>
            <p>
              Partner with us to expand monitoring capabilities and accelerate
              restoration across Africa's vital waterways.
            </p>

            <div className="join-restoration">
              <button>Partner With Us</button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Projects;