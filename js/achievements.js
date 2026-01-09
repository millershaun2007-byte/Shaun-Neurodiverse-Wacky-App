/**
 * Achievement System for Shaun's Neurodiverse Wacky App
 * Tracks badges, stars, progress, rewards, and celebrations
 */

class AchievementSystem {
    constructor() {
        this.achievements = this.initializeAchievements();
        this.userProgress = this.loadProgress();
        this.celebrationQueue = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkForNewAchievements();
    }

    /**
     * Initialize all available achievements
     */
    initializeAchievements() {
        return {
            // Getting Started Achievements
            firstSteps: {
                id: 'firstSteps',
                name: '🎉 First Steps!',
                description: 'Complete your first activity',
                badge: '🎉',
                category: 'starter',
                requirement: { type: 'activities', count: 1 },
                stars: 10,
                reward: 'Unlocked the Achievement System!',
                unlocked: false
            },
            earlyBird: {
                id: 'earlyBird',
                name: '🌅 Early Bird',
                description: 'Use the app 3 days in a row',
                badge: '🌅',
                category: 'dedication',
                requirement: { type: 'consecutiveDays', count: 3 },
                stars: 25,
                reward: 'Morning Mood Boost Theme',
                unlocked: false
            },
            
            // Activity Achievements
            activityNovice: {
                id: 'activityNovice',
                name: '🌟 Activity Novice',
                description: 'Complete 5 activities',
                badge: '🌟',
                category: 'activities',
                requirement: { type: 'activities', count: 5 },
                stars: 20,
                reward: 'New Activity Backgrounds',
                unlocked: false
            },
            activityPro: {
                id: 'activityPro',
                name: '⭐ Activity Pro',
                description: 'Complete 25 activities',
                badge: '⭐',
                category: 'activities',
                requirement: { type: 'activities', count: 25 },
                stars: 50,
                reward: 'Pro Badge & Custom Themes',
                unlocked: false
            },
            activityMaster: {
                id: 'activityMaster',
                name: '🏆 Activity Master',
                description: 'Complete 100 activities',
                badge: '🏆',
                category: 'activities',
                requirement: { type: 'activities', count: 100 },
                stars: 100,
                reward: 'Master Collection & Special Effects',
                unlocked: false
            },

            // Focus Achievements
            focusWarrior: {
                id: 'focusWarrior',
                name: '🎯 Focus Warrior',
                description: 'Complete 10 focus sessions',
                badge: '🎯',
                category: 'focus',
                requirement: { type: 'focusSessions', count: 10 },
                stars: 30,
                reward: 'Advanced Focus Timer',
                unlocked: false
            },
            deepFocus: {
                id: 'deepFocus',
                name: '🧘 Deep Focus',
                description: 'Complete a 60-minute focus session',
                badge: '🧘',
                category: 'focus',
                requirement: { type: 'focusMinutes', count: 60 },
                stars: 40,
                reward: 'Zen Mode Unlocked',
                unlocked: false
            },

            // Mood Tracking Achievements
            moodTracker: {
                id: 'moodTracker',
                name: '😊 Mood Tracker',
                description: 'Track your mood 7 days in a row',
                badge: '😊',
                category: 'mood',
                requirement: { type: 'moodTracking', count: 7 },
                stars: 35,
                reward: 'Mood Analytics Dashboard',
                unlocked: false
            },
            emotionalIntelligence: {
                id: 'emotionalIntelligence',
                name: '💖 Emotional Intelligence',
                description: 'Track your mood for 30 days',
                badge: '💖',
                category: 'mood',
                requirement: { type: 'moodTracking', count: 30 },
                stars: 75,
                reward: 'Advanced Mood Insights',
                unlocked: false
            },

            // Learning Achievements
            curiousMind: {
                id: 'curiousMind',
                name: '🧠 Curious Mind',
                description: 'Complete 5 learning activities',
                badge: '🧠',
                category: 'learning',
                requirement: { type: 'learningActivities', count: 5 },
                stars: 25,
                reward: 'Study Buddy Feature',
                unlocked: false
            },
            knowledgeSeeker: {
                id: 'knowledgeSeeker',
                name: '📚 Knowledge Seeker',
                description: 'Complete 20 learning activities',
                badge: '📚',
                category: 'learning',
                requirement: { type: 'learningActivities', count: 20 },
                stars: 60,
                reward: 'Advanced Learning Tools',
                unlocked: false
            },

            // Social Achievements
            friendlyFace: {
                id: 'friendlyFace',
                name: '🤝 Friendly Face',
                description: 'Share your progress with a friend',
                badge: '🤝',
                category: 'social',
                requirement: { type: 'shares', count: 1 },
                stars: 15,
                reward: 'Social Features Unlocked',
                unlocked: false
            },
            communityChampion: {
                id: 'communityChampion',
                name: '🌈 Community Champion',
                description: 'Share your progress 10 times',
                badge: '🌈',
                category: 'social',
                requirement: { type: 'shares', count: 10 },
                stars: 45,
                reward: 'Community Badge & Special Avatar',
                unlocked: false
            },

            // Milestone Achievements
            weekWarrior: {
                id: 'weekWarrior',
                name: '📅 Week Warrior',
                description: 'Use the app for 7 days',
                badge: '📅',
                category: 'milestones',
                requirement: { type: 'totalDays', count: 7 },
                stars: 30,
                reward: 'Weekly Summary Feature',
                unlocked: false
            },
            monthlyChampion: {
                id: 'monthlyChampion',
                name: '🗓️ Monthly Champion',
                description: 'Use the app for 30 days',
                badge: '🗓️',
                category: 'milestones',
                requirement: { type: 'totalDays', count: 30 },
                stars: 100,
                reward: 'Monthly Insights & Special Badge',
                unlocked: false
            },

            // Special Achievements
            nightOwl: {
                id: 'nightOwl',
                name: '🦉 Night Owl',
                description: 'Complete an activity after 10 PM',
                badge: '🦉',
                category: 'special',
                requirement: { type: 'lateNight', count: 1 },
                stars: 20,
                reward: 'Night Mode Theme',
                unlocked: false
            },
            perfectWeek: {
                id: 'perfectWeek',
                name: '💯 Perfect Week',
                description: 'Complete all daily goals for 7 days',
                badge: '💯',
                category: 'special',
                requirement: { type: 'perfectDays', count: 7 },
                stars: 80,
                reward: 'Perfect Badge & Premium Features',
                unlocked: false
            },
            starCollector: {
                id: 'starCollector',
                name: '⭐ Star Collector',
                description: 'Collect 500 stars',
                badge: '⭐',
                category: 'special',
                requirement: { type: 'totalStars', count: 500 },
                stars: 50,
                reward: 'Star Shop Access',
                unlocked: false
            },
            legendStatus: {
                id: 'legendStatus',
                name: '👑 Legend Status',
                description: 'Unlock all achievements',
                badge: '👑',
                category: 'special',
                requirement: { type: 'allAchievements', count: 1 },
                stars: 200,
                reward: 'Legend Crown & All Premium Features',
                unlocked: false
            }
        };
    }

    /**
     * Load user progress from localStorage
     */
    loadProgress() {
        const saved = localStorage.getItem('achievementProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            totalStars: 0,
            activities: 0,
            focusSessions: 0,
            focusMinutes: 0,
            learningActivities: 0,
            moodTracking: 0,
            shares: 0,
            totalDays: 0,
            consecutiveDays: 0,
            perfectDays: 0,
            lastActiveDate: null,
            unlockedAchievements: [],
            activityHistory: []
        };
    }

    /**
     * Save user progress to localStorage
     */
    saveProgress() {
        localStorage.setItem('achievementProgress', JSON.stringify(this.userProgress));
    }

    /**
     * Track an activity or event
     */
    trackEvent(eventType, data = {}) {
        const now = new Date();
        const today = now.toDateString();

        // Update consecutive days
        if (this.userProgress.lastActiveDate !== today) {
            const lastDate = new Date(this.userProgress.lastActiveDate || now);
            const daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 1) {
                this.userProgress.consecutiveDays++;
            } else if (daysDiff > 1) {
                this.userProgress.consecutiveDays = 1;
            }
            
            this.userProgress.totalDays++;
            this.userProgress.lastActiveDate = today;
        }

        // Track specific events
        switch (eventType) {
            case 'activity':
                this.userProgress.activities++;
                this.userProgress.activityHistory.push({
                    type: data.type || 'general',
                    timestamp: now.toISOString()
                });
                break;
            
            case 'focusSession':
                this.userProgress.focusSessions++;
                this.userProgress.focusMinutes += data.minutes || 0;
                break;
            
            case 'learning':
                this.userProgress.learningActivities++;
                break;
            
            case 'moodTracking':
                this.userProgress.moodTracking++;
                break;
            
            case 'share':
                this.userProgress.shares++;
                break;
            
            case 'perfectDay':
                this.userProgress.perfectDays++;
                break;
            
            case 'lateNight':
                if (now.getHours() >= 22) {
                    this.checkAchievement('nightOwl');
                }
                break;
        }

        this.saveProgress();
        this.checkForNewAchievements();
    }

    /**
     * Check if any new achievements have been unlocked
     */
    checkForNewAchievements() {
        Object.values(this.achievements).forEach(achievement => {
            if (!achievement.unlocked && !this.userProgress.unlockedAchievements.includes(achievement.id)) {
                if (this.checkRequirement(achievement.requirement)) {
                    this.unlockAchievement(achievement.id);
                }
            }
        });
    }

    /**
     * Check if a requirement is met
     */
    checkRequirement(requirement) {
        const { type, count } = requirement;
        
        switch (type) {
            case 'activities':
                return this.userProgress.activities >= count;
            case 'focusSessions':
                return this.userProgress.focusSessions >= count;
            case 'focusMinutes':
                return this.userProgress.focusMinutes >= count;
            case 'learningActivities':
                return this.userProgress.learningActivities >= count;
            case 'moodTracking':
                return this.userProgress.moodTracking >= count;
            case 'shares':
                return this.userProgress.shares >= count;
            case 'totalDays':
                return this.userProgress.totalDays >= count;
            case 'consecutiveDays':
                return this.userProgress.consecutiveDays >= count;
            case 'perfectDays':
                return this.userProgress.perfectDays >= count;
            case 'totalStars':
                return this.userProgress.totalStars >= count;
            case 'allAchievements':
                return this.userProgress.unlockedAchievements.length === Object.keys(this.achievements).length - 1;
            case 'lateNight':
                return true;
            default:
                return false;
        }
    }

    /**
     * Check specific achievement
     */
    checkAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (achievement && !achievement.unlocked) {
            if (this.checkRequirement(achievement.requirement)) {
                this.unlockAchievement(achievementId);
            }
        }
    }

    /**
     * Unlock an achievement
     */
    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        this.userProgress.unlockedAchievements.push(achievementId);
        this.userProgress.totalStars += achievement.stars;
        
        this.saveProgress();
        this.celebrateAchievement(achievement);
        this.dispatchAchievementEvent(achievement);
    }

    /**
     * Celebrate achievement with animations and notifications
     */
    celebrateAchievement(achievement) {
        // Create celebration overlay
        const celebration = document.createElement('div');
        celebration.className = 'achievement-celebration';
        celebration.innerHTML = `
            <div class="achievement-modal">
                <div class="achievement-header">
                    <h2>🎉 Achievement Unlocked! 🎉</h2>
                </div>
                <div class="achievement-badge-large">
                    ${achievement.badge}
                </div>
                <h3>${achievement.name}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-rewards">
                    <div class="stars-earned">
                        <span class="star-icon">⭐</span>
                        <span class="star-count">+${achievement.stars} Stars</span>
                    </div>
                    <div class="reward-earned">
                        <span class="reward-icon">🎁</span>
                        <span class="reward-text">${achievement.reward}</span>
                    </div>
                </div>
                <button class="celebration-close-btn">Awesome!</button>
                <div class="confetti-container"></div>
            </div>
        `;

        document.body.appendChild(celebration);

        // Trigger confetti animation
        this.triggerConfetti(celebration.querySelector('.confetti-container'));

        // Close button handler
        celebration.querySelector('.celebration-close-btn').addEventListener('click', () => {
            celebration.classList.add('fade-out');
            setTimeout(() => celebration.remove(), 300);
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.classList.add('fade-out');
                setTimeout(() => celebration.remove(), 300);
            }
        }, 5000);

        // Play celebration sound (if audio is available)
        this.playCelebrationSound();
    }

    /**
     * Trigger confetti animation
     */
    triggerConfetti(container) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }
    }

    /**
     * Play celebration sound
     */
    playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not available');
        }
    }

    /**
     * Dispatch custom achievement event
     */
    dispatchAchievementEvent(achievement) {
        const event = new CustomEvent('achievementUnlocked', {
            detail: achievement
        });
        window.dispatchEvent(event);
    }

    /**
     * Get user's total stars
     */
    getTotalStars() {
        return this.userProgress.totalStars;
    }

    /**
     * Get progress for a specific achievement
     */
    getAchievementProgress(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return null;

        const current = this.userProgress[achievement.requirement.type] || 0;
        const required = achievement.requirement.count;
        const percentage = Math.min((current / required) * 100, 100);

        return {
            current,
            required,
            percentage: Math.round(percentage),
            unlocked: achievement.unlocked
        };
    }

    /**
     * Get all achievements by category
     */
    getAchievementsByCategory(category) {
        return Object.values(this.achievements).filter(
            achievement => achievement.category === category
        );
    }

    /**
     * Get all unlocked achievements
     */
    getUnlockedAchievements() {
        return Object.values(this.achievements).filter(
            achievement => achievement.unlocked
        );
    }

    /**
     * Get achievement statistics
     */
    getStatistics() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.userProgress.unlockedAchievements.length;
        const percentage = Math.round((unlocked / total) * 100);

        return {
            total,
            unlocked,
            locked: total - unlocked,
            percentage,
            totalStars: this.userProgress.totalStars,
            consecutiveDays: this.userProgress.consecutiveDays,
            totalDays: this.userProgress.totalDays
        };
    }

    /**
     * Render achievements dashboard
     */
    renderDashboard(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getStatistics();
        const categories = [...new Set(Object.values(this.achievements).map(a => a.category))];

        container.innerHTML = `
            <div class="achievements-dashboard">
                <div class="achievements-header">
                    <h2>🏆 Achievements</h2>
                    <div class="achievements-stats">
                        <div class="stat-item">
                            <span class="stat-label">Total Stars</span>
                            <span class="stat-value">⭐ ${stats.totalStars}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Unlocked</span>
                            <span class="stat-value">${stats.unlocked}/${stats.total}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Progress</span>
                            <span class="stat-value">${stats.percentage}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Streak</span>
                            <span class="stat-value">🔥 ${stats.consecutiveDays} days</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${stats.percentage}%"></div>
                    </div>
                </div>
                
                <div class="achievements-categories">
                    ${categories.map(category => this.renderCategory(category)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render achievement category
     */
    renderCategory(category) {
        const achievements = this.getAchievementsByCategory(category);
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

        return `
            <div class="achievement-category">
                <h3>${categoryName}</h3>
                <div class="achievement-grid">
                    ${achievements.map(achievement => this.renderAchievementCard(achievement)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render individual achievement card
     */
    renderAchievementCard(achievement) {
        const progress = this.getAchievementProgress(achievement.id);
        const isUnlocked = achievement.unlocked;

        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-badge">${achievement.badge}</div>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-progress">
                    <div class="progress-text">
                        ${isUnlocked ? 'Unlocked!' : `${progress.current}/${progress.required}`}
                    </div>
                    <div class="progress-bar-small">
                        <div class="progress-fill-small" style="width: ${progress.percentage}%"></div>
                    </div>
                </div>
                <div class="achievement-stars">⭐ ${achievement.stars}</div>
                ${isUnlocked ? `<div class="achievement-reward">🎁 ${achievement.reward}</div>` : ''}
            </div>
        `;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for custom events
        window.addEventListener('activityCompleted', (e) => {
            this.trackEvent('activity', e.detail);
        });

        window.addEventListener('focusSessionCompleted', (e) => {
            this.trackEvent('focusSession', e.detail);
        });

        window.addEventListener('moodTracked', () => {
            this.trackEvent('moodTracking');
        });

        window.addEventListener('progressShared', () => {
            this.trackEvent('share');
        });
    }

    /**
     * Reset all progress (for testing or user request)
     */
    resetProgress() {
        if (confirm('Are you sure you want to reset all achievement progress? This cannot be undone!')) {
            localStorage.removeItem('achievementProgress');
            this.userProgress = this.loadProgress();
            Object.values(this.achievements).forEach(achievement => {
                achievement.unlocked = false;
            });
            alert('Achievement progress has been reset!');
        }
    }
}

// Initialize the achievement system
const achievementSystem = new AchievementSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementSystem;
}
