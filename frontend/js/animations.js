/**
 * GSAP Animations and Scroll Effects
 * Handles all page animations, transitions, and scroll-triggered effects
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initCardAnimations();
    initButtonAnimations();
});

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate hero badge
    tl.from('.hero-badge', {
        opacity: 0,
        y: -30,
        duration: 0.8
    });
    
    // Animate title lines
    tl.from('.title-line', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    }, '-=0.4');
    
    // Animate subtitle
    tl.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, '-=0.4');
    
    // Animate buttons
    tl.from('.hero-buttons .btn', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15
    }, '-=0.4');
    
    // Animate stats
    tl.from('.hero-stats', {
        opacity: 0,
        y: 40,
        duration: 1
    }, '-=0.4');
    
    // Animate floating orbs
    gsap.to('.floating-orb', {
        y: '+=30',
        duration: 3,
        ease: 'sine.inOut',
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Glass cards
    gsap.utils.toArray('.glass-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Architecture cards
    gsap.utils.toArray('.arch-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            rotateY: 15,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
}

/**
 * Card Hover Animations
 */
function initCardAnimations() {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.glass-card, .result-card, .arch-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', (e) => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Button Animations
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('click', () => {
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

/**
 * Progress Bar Animation
 */
function animateProgress(percentage, duration = 2) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    gsap.to(progressFill, {
        width: percentage + '%',
        duration: duration,
        ease: 'power2.out'
    });
    
    // Animate percentage counter
    gsap.to({ value: 0 }, {
        value: percentage,
        duration: duration,
        ease: 'power2.out',
        onUpdate: function() {
            progressPercentage.textContent = Math.round(this.targets()[0].value) + '%';
        }
    });
}

/**
 * Animate Progress Steps
 */
function activateProgressStep(stepIndex) {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((step, index) => {
        if (index <= stepIndex) {
            step.classList.add('active');
            gsap.from(step, {
                scale: 0.9,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        } else {
            step.classList.remove('active');
        }
    });
}

/**
 * Show Results with Animation
 */
function showResultsSection() {
    const resultsSection = document.getElementById('results');
    const insightsSection = document.getElementById('insights');

    resultsSection.style.display = 'block';
    insightsSection.style.display = 'block';

    // Scroll to results
    gsap.to(window, {
        scrollTo: resultsSection,
        duration: 1,
        ease: 'power3.inOut'
    });

    // Animate results cards
    const resultCards = document.querySelectorAll('.result-card');
    gsap.from(resultCards, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
    });

    // Add click handler to scroll to analytics
    addAnalyticsScrollHandler();
}

/**
 * Add Analytics Scroll Handler
 */
function addAnalyticsScrollHandler() {
    // Find all "View Analytics" or similar buttons in result cards
    const analyticsButtons = document.querySelectorAll('[data-analytics-btn]');

    analyticsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scrollToAnalytics();
        });
    });
}

/**
 * Scroll to Analytics Section with Animation
 */
function scrollToAnalytics() {
    const analyticsSection = document.getElementById('analytics');

    if (analyticsSection) {
        // Show section if hidden
        analyticsSection.style.display = 'block';

        // Smooth scroll
        gsap.to(window, {
            scrollTo: analyticsSection,
            duration: 1.2,
            ease: 'power3.inOut'
        });

        // Animate table rows
        setTimeout(() => {
            const tableRows = document.querySelectorAll('#analyticsTableBody tr');
            gsap.from(tableRows, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out'
            });
        }, 400);
    }
}

/**
 * Animate Insights
 */
function animateInsights() {
    const insightItems = document.querySelectorAll('.insight-item');
    
    gsap.from(insightItems, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

/**
 * Mobile Menu Toggle
 */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
});

// Export functions for use in other scripts
window.animateProgress = animateProgress;
window.activateProgressStep = activateProgressStep;
window.showResultsSection = showResultsSection;
window.animateInsights = animateInsights;
window.scrollToAnalytics = scrollToAnalytics;

