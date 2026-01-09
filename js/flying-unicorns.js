/**
 * Flying Unicorns Animation
 * Creates magical flying unicorns that soar across the screen
 */

class FlyingUnicorn {
    constructor() {
        this.unicorn = document.createElement('div');
        this.unicorn.className = 'flying-unicorn';
        this.unicorn.innerHTML = '🦄';
        this.unicorn.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 30 + 30}px;
            z-index: 9999;
            pointer-events: none;
            user-select: none;
        `;
        
        // Random starting position and trajectory
        this.x = -100;
        this.y = Math.random() * window.innerHeight;
        this.speedX = Math.random() * 3 + 2;
        this.speedY = Math.sin(Date.now()) * 2;
        this.amplitude = Math.random() * 50 + 30;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.offset = Math.random() * Math.PI * 2;
        
        document.body.appendChild(this.unicorn);
    }
    
    update() {
        this.x += this.speedX;
        this.y += Math.sin(this.x * this.frequency + this.offset) * 2;
        
        this.unicorn.style.left = `${this.x}px`;
        this.unicorn.style.top = `${this.y}px`;
        
        // Add sparkle trail
        if (Math.random() > 0.7) {
            this.createSparkle();
        }
        
        // Remove if off screen
        if (this.x > window.innerWidth + 100) {
            this.remove();
            return false;
        }
        return true;
    }
    
    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y + 10}px;
            font-size: 20px;
            z-index: 9998;
            pointer-events: none;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    remove() {
        if (this.unicorn.parentNode) {
            this.unicorn.parentNode.removeChild(this.unicorn);
        }
    }
}

class UnicornManager {
    constructor() {
        this.unicorns = [];
        this.maxUnicorns = 5;
        this.spawnInterval = 3000;
        this.isRunning = false;
        
        // Add CSS animation
        this.injectStyles();
    }
    
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle-fade {
                0% {
                    opacity: 1;
                    transform: scale(1) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.5) rotate(180deg);
                }
            }
            
            .flying-unicorn {
                animation: unicorn-float 2s ease-in-out infinite;
                filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.5));
            }
            
            @keyframes unicorn-float {
                0%, 100% {
                    transform: translateY(0px) rotate(-5deg);
                }
                50% {
                    transform: translateY(-10px) rotate(5deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // Animation loop
        const animate = () => {
            if (!this.isRunning) return;
            
            this.unicorns = this.unicorns.filter(unicorn => unicorn.update());
            requestAnimationFrame(animate);
        };
        animate();
        
        // Spawn new unicorns
        this.spawnTimer = setInterval(() => {
            if (this.unicorns.length < this.maxUnicorns) {
                this.unicorns.push(new FlyingUnicorn());
            }
        }, this.spawnInterval);
    }
    
    stop() {
        this.isRunning = false;
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
        }
        this.unicorns.forEach(unicorn => unicorn.remove());
        this.unicorns = [];
    }
    
    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// Global instance
let unicornManager = null;

// Initialize when DOM is ready
function initFlyingUnicorns() {
    if (!unicornManager) {
        unicornManager = new UnicornManager();
    }
    return unicornManager;
}

// Auto-start (optional - comment out if you want manual control)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFlyingUnicorns().start();
    });
} else {
    initFlyingUnicorns().start();
}

// Export for manual control
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FlyingUnicorn, UnicornManager, initFlyingUnicorns };
}
