/**
 * Celebration Effects Module
 * Provides confetti animations and celebration sounds
 */

class CelebrationEffects {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.confettiContainer = null;
        this.initAudioContext();
    }

    /**
     * Initialize Web Audio API context
     */
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    /**
     * Play a celebration sound effect
     * @param {string} type - Type of sound ('cheer', 'trumpet', 'applause', 'party')
     */
    playSound(type = 'cheer') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        switch(type) {
            case 'cheer':
                this.playCheerfullSound(oscillator, gainNode);
                break;
            case 'trumpet':
                this.playTrumpetSound(oscillator, gainNode);
                break;
            case 'applause':
                this.playApplauseSound();
                break;
            case 'party':
                this.playPartySound(oscillator, gainNode);
                break;
            default:
                this.playCheerfullSound(oscillator, gainNode);
        }
    }

    /**
     * Play cheerful ascending sound
     */
    playCheerfullSound(oscillator, gainNode) {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, this.audioContext.currentTime + 0.2); // C6
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    /**
     * Play trumpet fanfare sound
     */
    playTrumpetSound(oscillator, gainNode) {
        oscillator.type = 'square';
        const now = this.audioContext.currentTime;
        
        // Fanfare melody
        oscillator.frequency.setValueAtTime(392.00, now); // G4
        oscillator.frequency.setValueAtTime(523.25, now + 0.15); // C5
        oscillator.frequency.setValueAtTime(659.25, now + 0.3); // E5
        oscillator.frequency.setValueAtTime(783.99, now + 0.45); // G5
        
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.setValueAtTime(0.2, now + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        
        oscillator.start(now);
        oscillator.stop(now + 0.7);
    }

    /**
     * Play applause-like sound
     */
    playApplauseSound() {
        const duration = 1.0;
        const now = this.audioContext.currentTime;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const bufferSize = this.audioContext.sampleRate * 0.1;
                const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
                const data = buffer.getChannelData(0);
                
                for (let j = 0; j < bufferSize; j++) {
                    data[j] = Math.random() * 2 - 1;
                }
                
                const noise = this.audioContext.createBufferSource();
                const filter = this.audioContext.createBiquadFilter();
                const gainNode = this.audioContext.createGain();
                
                noise.buffer = buffer;
                filter.type = 'bandpass';
                filter.frequency.value = 1000;
                
                noise.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                
                noise.start();
                noise.stop(this.audioContext.currentTime + 0.1);
            }, i * 50);
        }
    }

    /**
     * Play party horn sound
     */
    playPartySound(oscillator, gainNode) {
        oscillator.type = 'sawtooth';
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        oscillator.frequency.setValueAtTime(800, now + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.3);
        
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.setValueAtTime(0.3, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        oscillator.start(now);
        oscillator.stop(now + 0.4);
    }

    /**
     * Create confetti animation
     * @param {Object} options - Configuration options
     */
    createConfetti(options = {}) {
        const defaults = {
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
            duration: 3000
        };

        const config = { ...defaults, ...options };
        
        if (!this.confettiContainer) {
            this.confettiContainer = document.createElement('div');
            this.confettiContainer.id = 'confetti-container';
            this.confettiContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                overflow: hidden;
            `;
            document.body.appendChild(this.confettiContainer);
        }

        for (let i = 0; i < config.particleCount; i++) {
            this.createConfettiPiece(config);
        }
    }

    /**
     * Create a single confetti piece
     */
    createConfettiPiece(config) {
        const confetti = document.createElement('div');
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const size = Math.random() * 10 + 5;
        const startX = (config.origin.x * window.innerWidth) + (Math.random() - 0.5) * config.spread * 5;
        const startY = config.origin.y * window.innerHeight;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${startX}px;
            top: ${startY}px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
        `;

        this.confettiContainer.appendChild(confetti);

        // Animate confetti
        const angle = (Math.random() - 0.5) * config.spread;
        const velocity = Math.random() * 5 + 5;
        const gravity = 0.5;
        const rotationSpeed = Math.random() * 10 - 5;
        
        let vx = Math.sin(angle * Math.PI / 180) * velocity;
        let vy = -Math.cos(angle * Math.PI / 180) * velocity;
        let x = startX;
        let y = startY;
        let rotation = 0;
        let opacity = 1;

        const animate = () => {
            vy += gravity;
            x += vx;
            y += vy;
            rotation += rotationSpeed;
            opacity -= 0.01;

            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = opacity;

            if (opacity > 0 && y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Trigger a full celebration with sound and confetti
     * @param {string} intensity - 'small', 'medium', or 'large'
     */
    celebrate(intensity = 'medium') {
        const configs = {
            small: { particleCount: 50, spread: 50 },
            medium: { particleCount: 100, spread: 70 },
            large: { particleCount: 200, spread: 90 }
        };

        this.createConfetti(configs[intensity]);
        this.playSound('cheer');

        if (intensity === 'large') {
            setTimeout(() => this.playSound('party'), 200);
            setTimeout(() => this.playSound('trumpet'), 400);
        }
    }

    /**
     * Create a confetti cannon effect
     */
    confettiCannon(side = 'both') {
        const leftConfig = {
            particleCount: 50,
            spread: 55,
            origin: { x: 0.1, y: 0.8 }
        };

        const rightConfig = {
            particleCount: 50,
            spread: 55,
            origin: { x: 0.9, y: 0.8 }
        };

        if (side === 'left' || side === 'both') {
            this.createConfetti(leftConfig);
            this.playSound('party');
        }

        if (side === 'right' || side === 'both') {
            setTimeout(() => {
                this.createConfetti(rightConfig);
                this.playSound('party');
            }, 100);
        }
    }

    /**
     * Clean up resources
     */
    cleanup() {
        if (this.confettiContainer) {
            this.confettiContainer.remove();
            this.confettiContainer = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CelebrationEffects;
}

// Global instance
window.celebrationEffects = new CelebrationEffects();
