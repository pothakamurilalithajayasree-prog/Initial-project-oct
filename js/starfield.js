/**
 * ====================================================================
 * PROJECT OCT — STARFIELD & AMBIENT CANVAS ENGINE
 * ====================================================================
 * Provides a lightweight, high-performance night sky with twinkling stars,
 * soft drifting cosmic dust, shooting stars, and subtle cursor glow.
 */

class StarfieldEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.dustParticles = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.lastShootingStarTime = Date.now();
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Interactive mouse / touch subtle glow
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });

    this.generateStars();
    this.animate();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.generateStars();
  }

  generateStars() {
    this.stars = [];
    const count = Math.min(Math.floor((this.width * this.height) / 5500), 220);
    const colors = [
      '#ffffff',
      '#fcf8ec',
      '#ffc6d4',
      '#b8b5ff',
      '#70d6ff'
    ];

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  triggerShootingStar() {
    const startX = Math.random() * this.width * 0.8;
    const startY = Math.random() * (this.height * 0.4);
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3; // roughly 45 degrees
    const speed = Math.random() * 8 + 12;
    const length = Math.random() * 90 + 70;

    this.shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: length,
      alpha: 1,
      fadeRate: 0.022,
      thickness: Math.random() * 1.5 + 1.2
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const now = Date.now();
    // Random shooting star every 4 to 8 seconds
    if (now - this.lastShootingStarTime > 4500 && Math.random() < 0.015) {
      this.triggerShootingStar();
      this.lastShootingStarTime = now;
    }

    // Render twinkling stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.alpha = star.baseAlpha + Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.25;
      const finalAlpha = Math.max(0.1, Math.min(1, star.alpha));

      this.ctx.save();
      this.ctx.globalAlpha = finalAlpha;
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow on brighter stars
      if (star.size > 1.4) {
        this.ctx.globalAlpha = finalAlpha * 0.35;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 2.4, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Render shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= s.fadeRate;

      if (s.alpha <= 0 || s.x > this.width + 100 || s.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      const tailX = s.x - (s.vx / 15) * s.length;
      const tailY = s.y - (s.vy / 15) * s.length;

      const gradient = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.7, 'rgba(255, 198, 212, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = s.thickness;
      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Subtle stardust halo around cursor / finger touch
    if (this.mouse.active) {
      this.ctx.save();
      const radial = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 70
      );
      radial.addColorStop(0, 'rgba(255, 117, 151, 0.12)');
      radial.addColorStop(0.5, 'rgba(184, 181, 255, 0.05)');
      radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.ctx.fillStyle = radial;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 70, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
