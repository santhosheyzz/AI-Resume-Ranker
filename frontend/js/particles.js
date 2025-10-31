/**
 * Floating Particles System
 * Creates dynamic particle effects that follow mouse movement
 */

class ParticleSystem {
    constructor(containerId, particleCount = 50) {
        this.container = document.getElementById(containerId);
        this.particleCount = particleCount;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.setupMouseTracking();
        this.animate();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        return particle;
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Calculate distance from mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Apply mouse influence
            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Boundary check
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            }
            
            // Update DOM
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.width = particle.size + 'px';
            particle.element.style.height = particle.size + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Reduce particle count for better performance
    new ParticleSystem('particles', 20);
});

