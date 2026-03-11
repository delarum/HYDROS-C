// Create floating particles define function, access id using dom, createloop,
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 100;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';//random horizontal positions using a math function generating random numbers from 0 to 1 and multiplying by 100
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';//how fast each particle moves making it look natural since they move at different rates
                particle.style.animationDelay = Math.random() * 5 + 's';//preventing same starting time
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                container.appendChild(particle);
            }
        }

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate metrics counting
                    if (entry.target.classList.contains('project-card')) {
                        animateMetrics(entry.target);
                    }

                    // Animate impact numbers
                    if (entry.target.classList.contains('impact-item')) {
                        animateImpactNumber(entry.target.querySelector('.impact-number'));
                    }
                }
            });
        }, observerOptions);

        // Animate project cards on scroll
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate impact items
        document.querySelectorAll('.impact-item').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(item);
        });

        // Count up animation for metrics
        function animateMetrics(card) {
            const metrics = card.querySelectorAll('.metric-value');
            metrics.forEach(metric => {
                const target = parseInt(metric.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        metric.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        metric.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
        }

        // Animate impact section numbers
        function animateImpactNumber(element) {
            if (!element || element.classList.contains('animated')) return;

            const target = parseFloat(element.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 2500;
            const startTime = performance.now();

            element.classList.add('animated');

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = target * easeOutQuart;

                if (isDecimal) {
                    element.textContent = current.toFixed(1) + (target > 100 ? '' : 'M');
                } else {
                    element.textContent = Math.floor(current).toLocaleString() + (target > 1000 ? '+' : '');
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        }

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category').split(' ');
                    const shouldShow = filter === 'all' || categories.includes(filter);

                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Parallax effect on scroll as you scroll the waves rotate slightly at different speeds
        let ticking = false;//to prevent the animation from running too many times per second
        function updateParallax() {
            const scrolled = window.pageYOffset;//detecting how far one has scrolled
            const waves = document.querySelectorAll('.wave');

            waves.forEach((wave, index) => {
                const speed = 0.5 + (index * 0.2);
                wave.style.transform = `translate(-50%, -50%) rotate(${scrolled * speed * 0.1}deg)`;//the further you scroll the more the wwaves rotate
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Mouse move effect for cards for the tilting of the cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });

        // Initialize
        createParticles();

        // Smooth reveal on load
        window.addEventListener('load', () => {
            document.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        });