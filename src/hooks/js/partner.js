// Form Handling
        const form = document.getElementById('partnershipForm');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                successMessage.classList.add('animate-fade-in');
            }, 1500);
        });

        function resetForm() {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.add('hidden');
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Partnership Inquiry</span><i class="fas fa-paper-plane"></i>';
        }

        // Smooth scroll for anchor links from become a partner to the form without jumping imedeately to the form
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Input animation on focus
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('transform', 'scale-[1.02]');
            });
            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('transform', 'scale-[1.02]');
            });
        });