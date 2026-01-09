// Placeholder - Main app functionality to be implemented
console.log('[app.js] loaded - placeholder');

// Basic navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.add('active');
            }
        });
    });
});

// Helper function for navigation
function goHome() {
    const homeSection = document.getElementById('home');
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    if (homeSection) {
        homeSection.classList.add('active');
    }
}
