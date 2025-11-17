function updateDashboard() {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];

    const total = reports.length;
    const baru = reports.filter(r => r.status === "Baru").length;
    const proses = reports.filter(r => r.status === "Diproses").length;
    const selesai = reports.filter(r => r.status === "Selesai").length;

    // Update dashboard statistics
    document.getElementById('totalReports').innerText = total;
    document.getElementById('newReports').innerText = baru;
    document.getElementById('processReports').innerText = proses;
    document.getElementById('doneReports').innerText = selesai;

    // Add animation to numbers
    animateNumbers();
}

function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.innerText;
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current > target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current);
            }
        }, 20);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    
    // Add scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});