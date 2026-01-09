// Sensory Zone / Calm Corner JavaScript
// Handles breathing animations, calming sounds, mindfulness prompts, and feelings check-in

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sensory Zone JS loaded');

    // Breathing Animation
    let breathingInterval = null;
    let isBreathing = false;
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    const startBreathingBtn = document.getElementById('start-breathing-btn');
    const pauseBreathingBtn = document.getElementById('pause-breathing-btn');
    const breathingPattern = document.getElementById('breathing-pattern');

    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', function() {
            if (!isBreathing) {
                startBreathing();
                startBreathingBtn.style.display = 'none';
                pauseBreathingBtn.style.display = 'inline-block';
            }
        });
    }

    if (pauseBreathingBtn) {
        pauseBreathingBtn.addEventListener('click', function() {
            stopBreathing();
            startBreathingBtn.style.display = 'inline-block';
            pauseBreathingBtn.style.display = 'none';
        });
    }

    function startBreathing() {
        isBreathing = true;
        const pattern = breathingPattern ? breathingPattern.value : '444';
        const times = pattern === '478' ? [4, 7, 8] : [4, 4, 4];
        
        let phase = 0; // 0: inhale, 1: hold, 2: exhale
        
        function breatheCycle() {
            if (!isBreathing) return;
            
            const phaseTimes = times;
            const currentTime = phaseTimes[phase];
            
            if (phase === 0) {
                // Inhale
                breathingText.textContent = '🌬️ Breathe In...';
                breathingText.style.color = '#667eea';
                animateCircle(true, currentTime);
            } else if (phase === 1) {
                // Hold
                breathingText.textContent = '⏸️ Hold...';
                breathingText.style.color = '#764ba2';
            } else if (phase === 2) {
                // Exhale
                breathingText.textContent = '💨 Breathe Out...';
                breathingText.style.color = '#48dbfb';
                animateCircle(false, currentTime);
            }
            
            setTimeout(function() {
                phase = (phase + 1) % 3;
                breatheCycle();
            }, currentTime * 1000);
        }
        
        breatheCycle();
    }

    function animateCircle(expand, duration) {
        if (!breathingCircle) return;
        
        const start = expand ? 200 : 300;
        const end = expand ? 300 : 200;
        const startTime = Date.now();
        
        function animate() {
            if (!isBreathing) {
                breathingCircle.style.width = '200px';
                breathingCircle.style.height = '200px';
                return;
            }
            
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);
            const size = start + (end - start) * eased;
            
            breathingCircle.style.width = size + 'px';
            breathingCircle.style.height = size + 'px';
            breathingCircle.style.transition = 'all 0.1s ease';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function stopBreathing() {
        isBreathing = false;
        if (breathingCircle) {
            breathingCircle.style.width = '200px';
            breathingCircle.style.height = '200px';
        }
        if (breathingText) {
            breathingText.textContent = 'Click Start to Begin';
            breathingText.style.color = '#667eea';
        }
    }

    // Calming Colors
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const color = btn.getAttribute('data-color');
            applyCalmingColor(color);
        });
    });

    function applyCalmingColor(color) {
        const calmCornerSection = document.getElementById('calm-corner');
        if (!calmCornerSection) return;
        
        let gradient = '';
        switch(color) {
            case 'lavender':
                gradient = 'linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%)';
                break;
            case 'skyblue':
                gradient = 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)';
                break;
            case 'softgreen':
                gradient = 'linear-gradient(135deg, #98FB98 0%, #3CB371 100%)';
                break;
            case 'peachy':
                gradient = 'linear-gradient(135deg, #FFDAB9 0%, #FFB6C1 100%)';
                break;
            default:
                gradient = 'transparent';
        }
        
        calmCornerSection.style.background = gradient;
        calmCornerSection.style.transition = 'background 2s ease';
    }

    // Soothing Sounds
    let currentAudio = null;
    const soundButtons = document.querySelectorAll('.sound-btn');
    const stopSoundBtn = document.getElementById('stop-sound-btn');
    const volumeSlider = document.getElementById('sound-volume');
    const volumeDisplay = document.getElementById('volume-display');

    // Create audio context for sound generation (simple tones)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    soundButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const sound = btn.getAttribute('data-sound');
            playSound(sound);
        });
    });

    if (stopSoundBtn) {
        stopSoundBtn.addEventListener('click', function() {
            stopAllSounds();
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volume = volumeSlider.value;
            if (volumeDisplay) {
                volumeDisplay.textContent = volume + '%';
            }
            if (currentAudio) {
                currentAudio.volume = volume / 100;
            }
        });
    }

    function playSound(soundType) {
        stopAllSounds();
        
        // For demo purposes, we'll generate simple tones
        // In production, you'd use actual sound files
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const volume = volumeSlider ? volumeSlider.value / 100 : 0.5;
        gainNode.gain.value = volume * 0.1; // Keep it quiet
        
        switch(soundType) {
            case 'ocean':
                // Simulate ocean waves with low frequency noise
                oscillator.type = 'sine';
                oscillator.frequency.value = 100;
                break;
            case 'rain':
                // Simulate rain with white noise
                oscillator.type = 'sawtooth';
                oscillator.frequency.value = 200;
                break;
            case 'music':
                // Gentle tone
                oscillator.type = 'sine';
                oscillator.frequency.value = 432; // Calming frequency
                break;
        }
        
        oscillator.start();
        currentAudio = { oscillator: oscillator, gainNode: gainNode, volume: volume / 100 };
        
        // Show feedback
        alert('🎵 Playing ' + soundType + ' sound. Click "Stop Sound" when done.\n\nNote: For full experience, add actual sound files in production!');
    }

    function stopAllSounds() {
        if (currentAudio && currentAudio.oscillator) {
            currentAudio.oscillator.stop();
            currentAudio = null;
        }
    }

    // Mindfulness Prompts
    const prompts = [
        "Notice 5 things you can see 👀",
        "Take 3 deep breaths 🌬️",
        "Stretch like a cat 🐱",
        "Give yourself a hug 🤗",
        "Count to 10 slowly 🔢",
        "Think of something that makes you smile 😊",
        "Wiggle your toes and fingers ✨",
        "Listen to the sounds around you 👂",
        "Say something kind to yourself 💜",
        "Imagine you're in your favorite place 🌈"
    ];

    let currentPromptIndex = 0;
    const promptText = document.getElementById('prompt-text');
    const nextPromptBtn = document.getElementById('next-prompt-btn');

    if (nextPromptBtn) {
        nextPromptBtn.addEventListener('click', function() {
            currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
            if (promptText) {
                promptText.textContent = prompts[currentPromptIndex];
                promptText.style.animation = 'none';
                setTimeout(function() {
                    promptText.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    }

    // Feelings Check-In
    const feelingButtons = document.querySelectorAll('.feeling-btn');
    const feelingResponse = document.getElementById('feeling-response');

    const responses = {
        happy: "That's wonderful! Keep spreading that joy! 😊✨",
        sad: "It's okay to feel sad sometimes. You're doing great. 💙",
        angry: "Take a deep breath. You've got this! 💪",
        worried: "Everything will be okay. Try taking some deep breaths. 🌟",
        excited: "Amazing! That energy is fantastic! 🎉",
        calm: "Beautiful! You're in a peaceful place. 🧘‍♀️💜"
    };

    feelingButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const feeling = btn.getAttribute('data-feeling');
            
            // Reset all buttons
            feelingButtons.forEach(function(b) {
                b.style.border = '3px solid transparent';
                b.style.transform = 'scale(1)';
            });
            
            // Highlight selected
            btn.style.border = '3px solid #764ba2';
            btn.style.transform = 'scale(1.2)';
            
            // Show response
            if (feelingResponse && responses[feeling]) {
                feelingResponse.textContent = responses[feeling];
                feelingResponse.style.animation = 'none';
                setTimeout(function() {
                    feelingResponse.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    });

    // Add CSS animation for fade in
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .calm-btn {
            padding: 15px 30px;
            font-size: 1.2em;
            border: none;
            border-radius: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        .calm-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .calm-btn:active {
            transform: translateY(-1px);
        }
        
        /* Reduce motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
});
