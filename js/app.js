// Main App JavaScript - Navigation and Core Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main App JS loaded');

    // Navigation handling
    const navButtons = document.querySelectorAll('.nav-btn[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetSection = btn.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(function(section) {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show target section
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            target.style.display = 'block';
        }

        // Update active nav button
        navButtons.forEach(function(btn) {
            btn.style.background = '';
            btn.style.transform = '';
        });
        
        const activeBtn = document.querySelector('.nav-btn[data-section="' + sectionId + '"]');
        if (activeBtn) {
            activeBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            activeBtn.style.transform = 'scale(1.05)';
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Show home section by default
    showSection('home');

    // Helper function to go back home
    window.goHome = function() {
        showSection('home');
    };
});
