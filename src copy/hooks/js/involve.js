// Data Management
        const Storage = {
            get: (key) => JSON.parse(localStorage.getItem(`hydrosc_${key}`) || 'null'),//returns the stored user as object or null then saves the object as a json string
            set: (key, value) => localStorage.setItem(`hydrosc_${key}`, JSON.stringify(value))
        };

        let currentUser = Storage.get('user');//redas user immediately from the LS when page is loaded
        let reports = Storage.get('reports') || [];
        let innovations = Storage.get('innovations') || [];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            if (currentUser) updateUserUI();
            loadRecentActivity();
            updateStats();
        });

        // Tab Switching
        function switchTab(tab) {
            // Update buttons
            document.querySelectorAll('[id^="tab-"]').forEach(btn => {
                btn.classList.remove('tab-active');
                btn.classList.add('text-slate-400');
            });
            document.getElementById(`tab-${tab}`).classList.add('tab-active');
            document.getElementById(`tab-${tab}`).classList.remove('text-slate-400');

            // Update sections
            document.querySelectorAll('section[id^="section-"]').forEach(sec => sec.classList.add('hidden'));
            document.getElementById(`section-${tab}`).classList.remove('hidden');
        }

        // Anonymous Toggle
        function toggleAnon() {
            const btn = document.getElementById('anonToggle');
            const dot = btn.querySelector('div');
            const isActive = btn.classList.contains('bg-brand-500');

            if (isActive) {
                btn.classList.remove('bg-brand-500');
                btn.classList.add('bg-slate-600');
                dot.style.right = 'auto';
                dot.style.left = '4px';
            } else {
                btn.classList.add('bg-brand-500');
                btn.classList.remove('bg-slate-600');
                dot.style.left = 'auto';
                dot.style.right = '4px';
            }
        }

        // Company Toggle
        function toggleCompany(checkbox) {
            document.getElementById('companyFields').classList.toggle('hidden', !checkbox.checked);
        }

        // File Handling
        function handleFiles(input) {
            const list = document.getElementById('fileList');
            list.classList.remove('hidden');
            list.innerHTML = Array.from(input.files).map(f => `
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg text-sm">
                    <span class="text-white truncate">${f.name}</span>
                    <span class="text-slate-500">${(f.size / 1024 / 1024).toFixed(1)} MB</span>
                </div>
            `).join('');
        }

        // Geolocation
        function getLocation() {
            if (!navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                document.querySelector('input[placeholder*="GPS"]').value = coords;
                showToast('Location captured');
            });
        }

        // Form Submissions
        function submitReport(e) {
            e.preventDefault();
            if (!currentUser) {
                openModal();
                return showToast('Please sign in first', 'error');
            }

            const report = {
                id: Date.now(),
                type: e.target.querySelector('select').value,
                location: e.target.querySelectorAll('select')[1].value,
                date: new Date().toLocaleDateString(),
                status: 'pending',
                reward: Math.floor(Math.random() * 400) + 100
            };

            reports.push(report);
            Storage.set('reports', reports);

            showToast('Report submitted successfully');
            e.target.reset();
            updateStats();
            loadRecentActivity();
        }

        function submitInnovation(e) {
            e.preventDefault();
            if (!currentUser) {
                openModal();
                return showToast('Please sign in first', 'error');
            }

            const innovation = {
                id: Date.now(),
                title: e.target.querySelector('input').value,
                date: new Date().toLocaleDateString(),
                status: 'under_review'
            };

            innovations.push(innovation);
            Storage.set('innovations', innovations);

            showToast('Proposal submitted for review');
            e.target.reset();
            loadSubmissions();
        }

        function saveDraft() {
            showToast('Draft saved locally');
        }

        // UI Updates
        function loadRecentActivity() {
            const mock = [
                { type: 'Toxic Spillage', location: 'Nairobi River', status: 'verified', reward: 350, date: '2h ago' },
                { type: 'Industrial Waste', location: 'Lake Victoria', status: 'pending', reward: 0, date: '5h ago' }
            ];

            document.getElementById('recentList').innerHTML = mock.map(r => `
                <div class="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                        <div class="text-sm text-white font-medium">${r.type}</div>
                        <div class="text-xs text-slate-500">${r.location} • ${r.date}</div>
                    </div>
                    ${r.status === 'verified'
                    ? `<div class="text-right"><div class="text-emerald-400 font-semibold text-sm">+$${r.reward}</div><div class="text-xs text-emerald-400/70">Verified</div></div>`
                    : `<div class="text-xs text-amber-400"><i class="fas fa-clock mr-1"></i>Pending</div>`
                }
                </div>
            `).join('');
        }

        function loadSubmissions() {
            const list = document.getElementById('submissionsList');
            const userSubs = innovations.filter(i => i.userId === currentUser?.id);

            list.innerHTML = userSubs.length ? userSubs.map(s => `
                <div class="p-4 bg-slate-800/30 rounded-lg border-l-4 border-purple-500">
                    <div class="flex justify-between items-start">
                        <h5 class="font-medium text-white">${s.title}</h5>
                        <span class="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded">${s.status}</span>
                    </div>
                    <div class="text-xs text-slate-500 mt-2">Submitted ${s.date}</div>
                </div>
            `).join('') : '<p class="text-slate-500 text-center py-8">No submissions yet</p>';
        }

        function updateStats() {
            const verified = reports.filter(r => r.status === 'verified');
            const total = verified.reduce((a, b) => a + b.reward, 0);

            document.getElementById('statEarnings').textContent = `$${total}`;
            document.getElementById('statVerified').textContent = verified.length;
            document.getElementById('statImpact').textContent = verified.length * 100;

            const history = document.getElementById('rewardsHistory');
            if (verified.length) {
                history.innerHTML = verified.map(r => `
                    <div class="flex items-center justify-between p-5 bg-slate-800/30 rounded-xl border-l-4 border-emerald-500">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                                <i class="fas fa-check text-emerald-400"></i>
                            </div>
                            <div>
                                <div class="font-medium text-white">${r.type}</div>
                                <div class="text-sm text-slate-500">${r.date}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-xl font-bold text-emerald-400">+$${r.reward}</div>
                            <div class="text-xs text-slate-500">Verified</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // SIGN IN
        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            currentUser = {
                id: Date.now(),
                email: email,
                name: email.split('@')[0],
                joined: new Date().toISOString()
            };
            Storage.set('user', currentUser);
            closeModal();
            updateUserUI();
            showToast('Welcome back');
        }

        function updateUserUI() {//hides login buttton then user section with name+avatar
            document.getElementById('loginBtn').classList.add('hidden');
            document.getElementById('userSection').classList.remove('hidden');
            document.getElementById('userSection').classList.add('flex');
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userAvatar').textContent = currentUser.name.slice(0, 2).toUpperCase();
        }

        document.getElementById("logoutBtn").addEventListener("click", logout);

function logout() {
    localStorage.removeItem("hydrosc_user");//my data was stored as hydros-user not just the user key
    currentUser = null;
    location.reload();
}

        // function logout() {
        //     console.log("Logout clicked")
        //     Storage.remove('user');
        //     location.reload();
        // }

        // Modal
        function openModal() {
            const modal = document.getElementById('loginModal');
            const content = document.getElementById('modalContent');
            modal.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeModal() {
            const modal = document.getElementById('loginModal');
            const content = document.getElementById('modalContent');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }

        // Toast
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;

            toast.classList.remove('translate-x-full', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-x-full', 'opacity-0');
            }, 3000);
        }