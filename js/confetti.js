/**
 * ====================================================================
 * PROJECT OCT — CELEBRATION & HEARTS CONFETTI ENGINE
 * ====================================================================
 * Renders soft floating hearts, warm glowing stardust fireworks, and
 * romantic confetti during the birthday reveal & riddle unlock.
 */

class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.floatingHearts = [];
    this.isRunning = false;
    this.heartsInterval = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  // Sparkle burst for riddle unlock
  spawnSparkleBurst(x, y) {
    const originX = x || this.width / 2;
    const originY = y || this.height / 2;
    const count = 40;
    const colors = ['#ff7597', '#ffd166', '#b8b5ff', '#ffffff', '#70d6ff'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 3;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.08,
        shape: Math.random() > 0.4 ? 'star' : 'circle'
      });
    }

    if (!this.isRunning) {
      this.start();
    }
  }

  // Grand celebratory fireworks & soft confetti
  triggerBirthdayCelebration() {
    // Launch a series of gentle colorful bursts
    const bursts = [
      { x: this.width * 0.3, y: this.height * 0.35, delay: 0 },
      { x: this.width * 0.7, y: this.height * 0.3, delay: 250 },
      { x: this.width * 0.5, y: this.height * 0.25, delay: 600 },
      { x: this.width * 0.25, y: this.height * 0.45, delay: 1100 },
      { x: this.width * 0.75, y: this.height * 0.4, delay: 1500 }
    ];

    bursts.forEach(b => {
      setTimeout(() => {
        this.spawnFireworkBurst(b.x, b.y);
      }, b.delay);
    });

    // Start continuous gentle floating hearts
    this.startFloatingHearts();
  }

  spawnFireworkBurst(x, y) {
    const count = 65;
    const colors = ['#ff7597', '#ffb3c6', '#ffd166', '#ffe3ea', '#b8b5ff', '#e8ecf8'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.04,
        friction: 0.98,
        shape: Math.random() > 0.5 ? 'heart' : 'sparkle'
      });
    }

    if (!this.isRunning) {
      this.start();
    }
  }

  startFloatingHearts() {
    if (this.heartsInterval) clearInterval(this.heartsInterval);

    this.heartsInterval = setInterval(() => {
      if (this.floatingHearts.length < 25) {
        this.floatingHearts.push({
          x: Math.random() * this.width,
          y: this.height + 20,
          vy: -(Math.random() * 1.2 + 0.8),
          vx: Math.sin(Math.random() * 10) * 0.5,
          size: Math.random() * 14 + 10,
          color: Math.random() > 0.4 ? 'rgba(255, 117, 151, 0.55)' : 'rgba(255, 209, 102, 0.45)',
          alpha: Math.random() * 0.4 + 0.5,
          wobbleSpeed: Math.random() * 0.04 + 0.02,
          wobbleOffset: Math.random() * Math.PI * 2
        });
      }
    }, 450);

    if (!this.isRunning) {
      this.start();
    }
  }

  stopFloatingHearts() {
    if (this.heartsInterval) {
      clearInterval(this.heartsInterval);
      this.heartsInterval = null;
    }
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Left curve
    ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
    // Right curve
    ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw firework particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      if (p.friction) {
        p.vx *= p.friction;
        p.vy *= p.friction;
      }
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size * 2, p.color, p.alpha);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Update & draw floating background hearts
    const now = Date.now();
    for (let i = this.floatingHearts.length - 1; i >= 0; i--) {
      const h = this.floatingHearts[i];
      h.y += h.vy;
      h.x += Math.sin(now * h.wobbleSpeed + h.wobbleOffset) * 0.8;

      if (h.y < -40) {
        this.floatingHearts.splice(i, 1);
        continue;
      }

      this.drawHeart(this.ctx, h.x, h.y, h.size, h.color, h.alpha);
    }

    if (this.particles.length === 0 && this.floatingHearts.length === 0 && !this.heartsInterval) {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }

    requestAnimationFrame(() => this.animate());
  }
}
