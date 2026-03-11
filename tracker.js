
        let currentCycle = "cycle_A";
        let isFirstLoad = true;

        // Device images for each tracker
        const deviceImages = [
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop',
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop',
            'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=200&fit=crop',
            'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=400&h=200&fit=crop'
        ];

        // Icons for data types
        const dataIcons = {
            visibility: '👁️',
            camera: '📷',
            ph: '⚗️',
            temp: '🌡️',
            co2: '💨',
            toxic: '☠️',
            treatment: '💊',
            battery: '🔋'
        };

        function createRipple(e, card) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }

        async function loadTrackers() {

            try {

                const res = await fetch("hydros_trackers.json");

                if (!res.ok) {
                    throw new Error("JSON file not found");
                }

                const data = await res.json();

                const trackers = data[currentCycle].trackers;

                const container = document.getElementById("trackerGrid");

                // Only create cards on first load, update existing cards thereafter
                if (isFirstLoad) {
                    container.innerHTML = "";
                    
                    trackers.forEach((tracker, index) => {

                        const statusClass =
                            tracker.toxic_chemical_index_ppm > 3 ? "danger" :
                                tracker.toxic_chemical_index_ppm > 2 ? "warning" :
                                    "good";

                        const card = document.createElement("div");

                        card.classList.add("tracker-card");
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.setAttribute('data-tracker-id', tracker.tracker_id);

                        // Add click ripple effect
                        card.addEventListener('click', (e) => createRipple(e, card));

                        // Toggle expand on button click
                        const expandBtn = document.createElement('button');
                        expandBtn.className = 'expand-btn';
                        expandBtn.innerHTML = '⋮';
                        expandBtn.onclick = (e) => {
                            e.stopPropagation();
                            card.classList.toggle('expanded');
                        };

                        const imageIndex = index % deviceImages.length;
                        
                        card.innerHTML = `

<div class="card-header">
    <img src="${deviceImages[imageIndex]}" alt="Device Location" class="card-bg-image">
    <div class="card-overlay">
        <div class="device-icon">📡</div>
    </div>
    <div class="tracker-title">${tracker.tracker_id}</div>
</div>

<div class="data-row" data-field="visibility">
    <span class="data-label"><span class="data-icon">${dataIcons.visibility}</span> Visibility</span>
    <span class="data-value">${tracker.water_visibility_cm} cm</span>
</div>

<div class="data-row" data-field="camera">
    <span class="data-label"><span class="data-icon">${dataIcons.camera}</span> Camera Obstruction</span>
    <span class="data-value">${tracker.camera_radial_obstruction_percent}%</span>
</div>

<div class="data-row" data-field="ph">
    <span class="data-label"><span class="data-icon">${dataIcons.ph}</span> pH Level</span>
    <span class="data-value">${tracker.ph_level}</span>
</div>

<div class="data-row" data-field="temp">
    <span class="data-label"><span class="data-icon">${dataIcons.temp}</span> Temperature</span>
    <span class="data-value">${tracker.water_temperature_c}°C</span>
</div>

<div class="data-row" data-field="co2">
    <span class="data-label"><span class="data-icon">${dataIcons.co2}</span> CO₂ Level</span>
    <span class="data-value">${tracker.co2_dissolved_mg_per_l} mg/L</span>
</div>

<div class="data-row" data-field="toxic">
    <span class="data-label"><span class="data-icon">${dataIcons.toxic}</span> Toxic Chemicals</span>
    <span class="data-value">${tracker.toxic_chemical_index_ppm} ppm</span>
</div>

<div class="data-row" data-field="treatment">
    <span class="data-label"><span class="data-icon">${dataIcons.treatment}</span> Treatment Chemical</span>
    <span class="data-value">${tracker.treatment_chemical_remaining_percent}%</span>
</div>

<div class="data-row" data-field="battery">
    <span class="data-label"><span class="data-icon">${dataIcons.battery}</span> Battery</span>
    <span class="data-value">${tracker.battery_level_percent}%</span>
</div>

<div class="status ${statusClass}">
    Device Status: ${tracker.device_status}
</div>

<div class="mini-chart">
    <div class="chart-bar">
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
        <div class="bar" style="height: ${Math.random() * 60 + 20}%"></div>
    </div>
</div>

`;

                        card.appendChild(expandBtn);
                        container.appendChild(card);

                    });

                    isFirstLoad = false;
                } else {
                    // Update existing cards without recreating them
                    trackers.forEach((tracker, index) => {
                        const card = container.children[index];
                        if (!card) return;
                        
                        const statusClass = tracker.toxic_chemical_index_ppm > 3 ? "danger" : 
                                           tracker.toxic_chemical_index_ppm > 2 ? "warning" : "good";
                        
                        // Update data values with flash animation
                        const updateValue = (field, value) => {
                            const row = card.querySelector(`[data-field="${field}"]`);
                            if (row) {
                                const valueEl = row.querySelector('.data-value');
                                if (valueEl.textContent !== value) {
                                    valueEl.textContent = value;
                                    valueEl.classList.add('value-updated');
                                    setTimeout(() => valueEl.classList.remove('value-updated'), 500);
                                }
                            }
                        };
                        
                        updateValue('visibility', `${tracker.water_visibility_cm} cm`);
                        updateValue('camera', `${tracker.camera_radial_obstruction_percent}%`);
                        updateValue('ph', tracker.ph_level);
                        updateValue('temp', `${tracker.water_temperature_c}°C`);
                        updateValue('co2', `${tracker.co2_dissolved_mg_per_l} mg/L`);
                        updateValue('toxic', `${tracker.toxic_chemical_index_ppm} ppm`);
                        updateValue('treatment', `${tracker.treatment_chemical_remaining_percent}%`);
                        updateValue('battery', `${tracker.battery_level_percent}%`);
                        
                        // Update status
                        const statusDiv = card.querySelector('.status');
                        statusDiv.className = `status ${statusClass}`;
                        statusDiv.textContent = `Device Status: ${tracker.device_status}`;
                    });
                }

                currentCycle = currentCycle === "cycle_A" ? "cycle_B" : "cycle_A";

            }

            catch (error) {
                console.error("Error loading tracker data:", error);
            }

        }

        loadTrackers();
        setInterval(loadTrackers, 8000);