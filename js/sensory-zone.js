// Sensory Zone / Calm Corner JavaScript
// Handles breathing exercises, sensory animations, and mindfulness activities

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sensory Zone initialized');

    // === FEELINGS CHECK-IN ===
    const feelingBtns = document.querySelectorAll('.feeling-btn');
    const feelingResponse = document.getElementById('feeling-response');

    const feelingResponses = {
        happy: "That's wonderful! 😊 Keep spreading that joy!",
        calm: "Being calm is a superpower! 😌 You're doing great!",
        worried: "It's okay to feel worried. 😰 Try some deep breaths with me!",
        sad: "I'm here with you. 😢 Let's try a calming activity together.",
        angry: "Those big feelings are okay. 😠 Let's take some deep breaths.",
        excited: "Yay! Your excitement is amazing! 🤩 Channel that energy!"
    };

    feelingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const feeling = this.getAttribute('data-feeling');
            
            // Visual feedback
            feelingBtns.forEach(b => b.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.3)';
            
            // Show response
            if (feelingResponse) {
                feelingResponse.textContent = feelingResponses[feeling];
                feelingResponse.style.fontWeight = 'bold';
            }
            
            // Save to localStorage
            localStorage.setItem('lastFeeling', feeling);
            localStorage.setItem('lastFeelingTime', new Date().toISOString());
        });

        // Hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            const feeling = this.getAttribute('data-feeling');
            const lastFeeling = localStorage.getItem('lastFeeling');
            if (feeling === lastFeeling) {
                this.style.transform = 'scale(1.3)';
            } else {
                this.style.transform = 'scale(1)';
            }
        });
    });

    // === BREATHING EXERCISE ===
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingInstruction = document.getElementById('breathing-instruction');
    const startBreathingBtn = document.getElementById('start-breathing-btn');
    const stopBreathingBtn = document.getElementById('stop-breathing-btn');
    
    let breathingInterval = null;
    let breathingPhase = 0;
    
    const breathingPhases = [
        { text: 'Breathe in...', scale: 1.8, duration: 4000, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { text: 'Hold...', scale: 1.8, duration: 4000, color: 'linear-gradient(135deg, #9370DB 0%, #FFD700 100%)' },
        { text: 'Breathe out...', scale: 1, duration: 4000, color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
        { text: 'Rest...', scale: 1, duration: 2000, color: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }
    ];

    function runBreathingCycle() {
        if (!breathingCircle || !breathingInstruction) return;
        
        const phase = breathingPhases[breathingPhase];
        
        // Update instruction
        breathingInstruction.textContent = phase.text;
        breathingInstruction.style.color = breathingPhase % 2 === 0 ? '#2d5016' : '#764ba2';
        
        // Animate circle
        breathingCircle.style.transform = `scale(${phase.scale})`;
        breathingCircle.style.background = phase.color;
        breathingCircle.style.transition = `transform ${phase.duration}ms ease-in-out, background ${phase.duration}ms ease-in-out`;
        
        // Move to next phase
        breathingPhase = (breathingPhase + 1) % breathingPhases.length;
        
        // Schedule next phase
        breathingInterval = setTimeout(runBreathingCycle, phase.duration);
    }

    function startBreathing() {
        if (breathingInterval) return; // Already running
        
        breathingPhase = 0;
        if (startBreathingBtn) startBreathingBtn.style.display = 'none';
        if (stopBreathingBtn) stopBreathingBtn.style.display = 'inline-block';
        runBreathingCycle();
    }

    function stopBreathing() {
        if (breathingInterval) {
            clearTimeout(breathingInterval);
            breathingInterval = null;
        }
        
        if (breathingCircle) {
            breathingCircle.style.transform = 'scale(1)';
            breathingCircle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        
        if (breathingInstruction) {
            breathingInstruction.textContent = 'Click Start to begin';
            breathingInstruction.style.color = '#2d5016';
        }
        
        if (startBreathingBtn) startBreathingBtn.style.display = 'inline-block';
        if (stopBreathingBtn) stopBreathingBtn.style.display = 'none';
    }

    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', startBreathing);
    }
    
    if (stopBreathingBtn) {
        stopBreathingBtn.addEventListener('click', stopBreathing);
    }

    // === SENSORY ANIMATIONS ===
    const animationCanvas = document.getElementById('animation-canvas');
    const bubblesBtn = document.getElementById('bubbles-btn');
    const wavesBtn = document.getElementById('waves-btn');
    const sparklesBtn = document.getElementById('sparkles-btn');
    const stopAnimationBtn = document.getElementById('stop-animation-btn');
    
    let currentAnimation = null;
    let animationElements = [];

    function clearAnimation() {
        if (currentAnimation) {
            cancelAnimationFrame(currentAnimation);
            currentAnimation = null;
        }
        
        animationElements.forEach(el => {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        animationElements = [];
        
        if (animationCanvas) {
            animationCanvas.innerHTML = '';
            animationCanvas.style.background = 'rgba(255,255,255,0.3)';
        }
    }

    function createBubbles() {
        clearAnimation();
        if (!animationCanvas) return;
        
        animationCanvas.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
        
        function addBubble() {
            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.width = Math.random() * 60 + 20 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.borderRadius = '50%';
            bubble.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`;
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.bottom = '-60px';
            bubble.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
            bubble.style.animation = `floatUp ${5 + Math.random() * 5}s ease-in forwards`;
            
            animationCanvas.appendChild(bubble);
            animationElements.push(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 10000);
        }
        
        // Add CSS animation if not already present
        if (!document.getElementById('floatUp-style')) {
            const style = document.createElement('style');
            style.id = 'floatUp-style';
            style.textContent = `
                @keyframes floatUp {
                    to { transform: translateY(-350px); opacity: 0; }
                }
                @keyframes waveMove {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(30px); }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        addBubble();
        currentAnimation = setInterval(addBubble, 800);
    }

    function createWaves() {
        clearAnimation();
        if (!animationCanvas) return;
        
        animationCanvas.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.style.position = 'absolute';
            wave.style.width = '100%';
            wave.style.height = '50px';
            wave.style.background = `rgba(255, 255, 255, ${0.3 - i * 0.05})`;
            wave.style.borderRadius = '50%';
            wave.style.top = (i * 60) + 'px';
            wave.style.animation = `waveMove ${3 + i * 0.5}s ease-in-out infinite`;
            wave.style.animationDelay = `${i * 0.2}s`;
            
            animationCanvas.appendChild(wave);
            animationElements.push(wave);
        }
    }

    function createSparkles() {
        clearAnimation();
        if (!animationCanvas) return;
        
        animationCanvas.style.background = 'linear-gradient(135deg, #434343 0%, #000000 100%)';
        
        function addSparkle() {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = Math.random() * 30 + 20 + 'px';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = `sparkle ${1 + Math.random() * 2}s ease-in-out`;
            
            animationCanvas.appendChild(sparkle);
            animationElements.push(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
        
        addSparkle();
        currentAnimation = setInterval(addSparkle, 300);
    }

    if (bubblesBtn) bubblesBtn.addEventListener('click', createBubbles);
    if (wavesBtn) wavesBtn.addEventListener('click', createWaves);
    if (sparklesBtn) sparklesBtn.addEventListener('click', createSparkles);
    if (stopAnimationBtn) stopAnimationBtn.addEventListener('click', clearAnimation);

    // === MINDFULNESS PROMPTS ===
    const mindfulnessText = document.getElementById('mindfulness-text');
    const newMindfulnessBtn = document.getElementById('new-mindfulness-btn');
    
    const mindfulnessPrompts = [
        "Notice 3 things you can see right now...",
        "Take a deep breath and feel your body relax...",
        "Listen carefully. What sounds can you hear?",
        "Notice 2 things you can touch. How do they feel?",
        "Think of something that makes you smile 😊",
        "Imagine your favorite color surrounding you like a warm hug...",
        "Count slowly: 1... 2... 3... 4... 5...",
        "Notice how your feet feel on the ground...",
        "Think of your favorite place. What do you see there?",
        "Take three slow breaths. You're doing great!",
        "Notice something beautiful around you...",
        "Think of someone you love. Send them kind thoughts.",
        "Feel the air as you breathe in and out...",
        "What's one thing you're grateful for today?",
        "Imagine a peaceful garden. What's growing there?",
        "Listen to your heartbeat. It's keeping you alive!",
        "Notice the colors in the room around you...",
        "Think of a happy memory. Hold it close.",
        "Stretch your body gently. How does that feel?",
        "You are safe. You are loved. You are enough. 💜"
    ];
    
    let currentPromptIndex = 0;

    function showNewMindfulnessPrompt() {
        if (!mindfulnessText) return;
        
        currentPromptIndex = Math.floor(Math.random() * mindfulnessPrompts.length);
        mindfulnessText.textContent = mindfulnessPrompts[currentPromptIndex];
        mindfulnessText.style.animation = 'none';
        setTimeout(() => {
            mindfulnessText.style.animation = 'fadeIn 1s ease-in';
        }, 10);
    }

    if (newMindfulnessBtn) {
        newMindfulnessBtn.addEventListener('click', showNewMindfulnessPrompt);
    }

    // === AUDIO CONTROLS ===
    const volumeSlider = document.getElementById('volume-slider');
    const volumeDisplay = document.getElementById('volume-display');
    
    // Load saved volume
    const savedVolume = localStorage.getItem('calmCornerVolume') || '50';
    if (volumeSlider) volumeSlider.value = savedVolume;
    if (volumeDisplay) volumeDisplay.textContent = savedVolume + '%';
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volume = this.value;
            if (volumeDisplay) volumeDisplay.textContent = volume + '%';
            localStorage.setItem('calmCornerVolume', volume);
        });
    }

    // === NAVIGATION SUPPORT ===
    // Handle navigation to calm corner section
    const calmCornerSection = document.getElementById('calm-corner');
    const navButtons = document.querySelectorAll('.nav-btn[data-section]');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Hide all sections
            const allSections = document.querySelectorAll('.content-section');
            allSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.add('active');
                target.style.display = 'block';
            }
            
            // Stop breathing animation if leaving calm corner
            if (targetSection !== 'calm-corner' && breathingInterval) {
                stopBreathing();
                clearAnimation();
            }
        });
    });

    // Ensure home section is visible on load
    const homeSection = document.getElementById('home');
    if (homeSection && !homeSection.classList.contains('active')) {
        homeSection.classList.add('active');
        homeSection.style.display = 'block';
    }

    console.log('Sensory Zone ready!');
});
