/**
 * Main App Navigation Controller
 * Handles navigation between sections using nav buttons
 */

(function() {
    'use strict';

    // Initialize navigation when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎉 App navigation initializing...');
        
        initializeNavigation();
        
        console.log('✅ App navigation initialized successfully!');
    });

    /**
     * Initialize navigation system
     */
    function initializeNavigation() {
        // Get all navigation buttons (only those with data-section attribute)
        const navButtons = document.querySelectorAll('.nav-btn[data-section]');
        const contentSections = document.querySelectorAll('.content-section');

        console.log(`Found ${navButtons.length} navigation buttons`);
        console.log(`Found ${contentSections.length} content sections`);

        // Ensure home section is active by default
        setActiveSection('home');

        // Add click event listeners to all nav buttons
        navButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const sectionId = this.getAttribute('data-section');
                console.log(`🔘 Navigation button clicked: ${sectionId}`);
                
                if (sectionId) {
                    setActiveSection(sectionId);
                } else {
                    console.warn('⚠️ Button clicked but no data-section attribute found');
                }
            });

            // Add keyboard support (Enter and Space)
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    /**
     * Set a section as active and hide all others
     * @param {string} sectionId - The ID of the section to activate
     */
    function setActiveSection(sectionId) {
        console.log(`📍 Switching to section: ${sectionId}`);
        
        // Get the target section
        const targetSection = document.getElementById(sectionId);
        
        if (!targetSection) {
            console.error(`❌ Section not found: ${sectionId}`);
            return;
        }

        // Remove active class from all sections
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(function(section) {
            section.classList.remove('active');
        });

        // Remove active class from all nav buttons
        const allNavButtons = document.querySelectorAll('.nav-btn[data-section]');
        allNavButtons.forEach(function(button) {
            button.classList.remove('active');
        });

        // Add active class to target section
        targetSection.classList.add('active');

        // Add active class to corresponding nav button
        const activeButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Scroll to top of page for better UX
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        console.log(`✅ Successfully switched to section: ${sectionId}`);
    }

    // Expose setActiveSection function globally for other scripts to use
    window.setActiveSection = setActiveSection;
})();
