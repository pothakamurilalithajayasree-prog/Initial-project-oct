/**
 * ====================================================================
 * PROJECT OCT — ORIGINAL SUPERHERO SCENE CONTROLLER & SVG ART
 * ====================================================================
 * 100% Original, cute, stylized, minimal superhero vector artwork.
 * Zero copyrighted logos or trademarked assets.
 */

class BatSceneController {
  constructor() {}

  /**
   * Generates the SVG template for Screen 3 (First interlude)
   */
  static renderScene1(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <svg class="bat-stage-svg" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0c1230" />
            <stop offset="60%" stop-color="#080d24" />
            <stop offset="100%" stop-color="#030510" />
          </linearGradient>
          
          <radialGradient id="moonGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff8db" stop-opacity="1" />
            <stop offset="40%" stop-color="#f5e1a4" stop-opacity="0.9" />
            <stop offset="80%" stop-color="#d4af37" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#d4af37" stop-opacity="0" />
          </radialGradient>

          <radialGradient id="signalBeam1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff4c2" stop-opacity="0.85" />
            <stop offset="60%" stop-color="#ffd166" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#ffd166" stop-opacity="0" />
          </radialGradient>

          <filter id="glowFilter1" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Night Sky Background -->
        <rect width="600" height="320" fill="url(#skyGrad1)" />

        <!-- Soft Clouds -->
        <path d="M 50,80 Q 120,50 190,80 Q 260,110 330,80 Q 380,60 440,90 Q 520,70 580,95 L 600,140 L 0,140 Z" fill="#131b3e" opacity="0.4" />
        <path d="M 0,110 Q 70,85 150,115 Q 230,145 320,110 Q 400,85 480,120 Q 540,105 600,125 L 600,180 L 0,180 Z" fill="#0f1633" opacity="0.5" />

        <!-- Glowing Crescent / Full Moon -->
        <circle cx="470" cy="75" r="38" fill="url(#moonGlow1)" />
        <circle cx="470" cy="75" r="28" fill="#fffdf2" />

        <!-- Distant Fictional Skyline -->
        <g id="skyline-distant" fill="#070b1c" opacity="0.85">
          <rect x="30" y="140" width="45" height="180" />
          <rect x="85" y="160" width="35" height="160" />
          <polygon points="102,125 85,160 120,160" />
          <rect x="130" y="120" width="55" height="200" />
          <rect x="195" y="150" width="40" height="170" />
          <polygon points="215,110 195,150 235,150" />
          <rect x="245" y="130" width="60" height="190" />
          <rect x="315" y="155" width="48" height="165" />
          <rect x="375" y="135" width="52" height="185" />
          <polygon points="401,95 375,135 427,135" />
          <rect x="440" y="160" width="42" height="160" />
          <rect x="495" y="140" width="65" height="180" />
        </g>

        <!-- Warm Tiny Skyline Windows -->
        <g fill="#ffd166" opacity="0.6">
          <circle cx="45" cy="165" r="1.5" /><circle cx="55" cy="180" r="1.5" /><circle cx="45" cy="200" r="1.5" />
          <circle cx="145" cy="140" r="1.5" /><circle cx="160" cy="155" r="1.5" /><circle cx="150" cy="180" r="1.5" />
          <circle cx="260" cy="150" r="1.5" /><circle cx="280" cy="170" r="1.5" /><circle cx="270" cy="200" r="1.5" />
          <circle cx="390" cy="160" r="1.5" /><circle cx="410" cy="175" r="1.5" /><circle cx="400" cy="210" r="1.5" />
          <circle cx="515" cy="160" r="1.5" /><circle cx="535" cy="175" r="1.5" />
        </g>

        <!-- Bat Signal Beam in Sky (Original Cute Stylized Emblem) -->
        <g id="bat-signal-projector" opacity="0" style="transition: opacity 1s ease;">
          <ellipse cx="260" cy="80" rx="42" ry="28" fill="url(#signalBeam1)" filter="url(#glowFilter1)" />
          <!-- Original cute stylized bat-heart silhouette inside the beam -->
          <path d="M 260,70 Q 254,63 248,66 Q 244,72 248,77 Q 254,82 260,89 Q 266,82 272,77 Q 276,72 272,66 Q 266,63 260,70 Z" fill="#0c1230" />
          <polygon points="252,68 250,62 254,66" fill="#0c1230" />
          <polygon points="268,68 270,62 266,66" fill="#0c1230" />
        </g>

        <!-- Foreground Rooftop Ledge -->
        <g id="rooftop-foreground" fill="#04060e">
          <polygon points="0,240 160,240 180,260 180,320 0,320" />
          <rect x="0" y="240" width="165" height="12" fill="#060914" />
          <rect x="140" y="248" width="30" height="24" fill="#03040a" />
        </g>

        <!-- ORIGINAL CUTE MINI HERO SILHOUETTE (Standing on rooftop) -->
        <g id="hero-standing" transform="translate(135, 198)">
          <!-- Flowing Cape -->
          <path class="hero-cape" d="M 12,18 Q 4,28 0,44 Q 14,40 22,32 Z" fill="#0a0f26" />
          <path d="M 12,18 Q 6,28 3,42 Q 14,38 20,32 Z" fill="#03040a" />
          
          <!-- Cute Chibi Body -->
          <ellipse cx="16" cy="24" rx="7" ry="10" fill="#03040a" />
          
          <!-- Cute Chibi Head with Bat-styled cute ears -->
          <circle cx="16" cy="12" r="7" fill="#03040a" />
          <polygon points="11,10 9,2 14,7" fill="#03040a" />
          <polygon points="21,10 23,2 18,7" fill="#03040a" />
          
          <!-- Cute Glowing Eyes -->
          <circle cx="14" cy="11" r="1.2" fill="#70d6ff" filter="url(#glowFilter1)" />
          <circle cx="18" cy="11" r="1.2" fill="#70d6ff" filter="url(#glowFilter1)" />
          
          <!-- Tiny Feet on Ledge -->
          <ellipse cx="14" cy="34" rx="2.5" ry="1.5" fill="#03040a" />
          <ellipse cx="19" cy="34" rx="2.5" ry="1.5" fill="#03040a" />
        </g>

        <!-- ORIGINAL CUTE MINI HERO (Gliding across sky) -->
        <g id="hero-gliding" opacity="0" transform="translate(-100, -100)">
          <!-- Spread Glider Cape -->
          <path d="M 0,16 Q 16,-2 38,12 Q 22,26 14,24 Z" fill="#03040a" />
          <path d="M 0,16 Q -16,-2 -38,12 Q -22,26 -14,24 Z" fill="#03040a" />
          <!-- Cute Body -->
          <ellipse cx="0" cy="16" rx="6" ry="10" fill="#03040a" />
          <!-- Head & Ears -->
          <circle cx="0" cy="6" r="6" fill="#03040a" />
          <polygon points="-4,4 -6,-2 -1,2" fill="#03040a" />
          <polygon points="4,4 6,-2 1,2" fill="#03040a" />
          <!-- Glowing Eyes -->
          <circle cx="-2" cy="5" r="1" fill="#70d6ff" />
          <circle cx="2" cy="5" r="1" fill="#70d6ff" />
        </g>
      </svg>
    `;
  }

  /**
   * Plays the Screen 3 sequence: Standing -> Gliding Leap -> Signal Beam -> Dialogue
   */
  static playScene1Animation(callback) {
    const standingHero = document.getElementById('hero-standing');
    const glidingHero = document.getElementById('hero-gliding');
    const signalBeam = document.getElementById('bat-signal-projector');

    // Step 1: Perched standing for 1.2s
    setTimeout(() => {
      if (standingHero) standingHero.style.opacity = '0';
      if (glidingHero) {
        glidingHero.style.opacity = '1';
        glidingHero.style.animation = 'heroGlideAcross 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards';
      }
    }, 1200);

    // Step 2: Signal beam shines in sky
    setTimeout(() => {
      if (signalBeam) signalBeam.style.opacity = '0.9';
    }, 1800);

    // Step 3: Fade signal beam and trigger dialogue callback
    setTimeout(() => {
      if (signalBeam) signalBeam.style.opacity = '0.4';
      if (callback) callback();
    }, 3200);
  }

  /**
   * Generates the SVG template for Screen 7 (Second suspense interlude)
   */
  static renderScene2(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <svg class="bat-stage-svg" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#070a1a" />
            <stop offset="60%" stop-color="#040612" />
            <stop offset="100%" stop-color="#010207" />
          </linearGradient>
          <radialGradient id="moonGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="35%" stop-color="#fff6cc" stop-opacity="0.95" />
            <stop offset="70%" stop-color="#ffd166" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#ffd166" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Deep Dark Midnight Sky -->
        <rect width="600" height="320" fill="url(#skyGrad2)" />

        <!-- Enormous Suspense Moon -->
        <circle cx="300" cy="110" r="65" fill="url(#moonGlow2)" />
        <circle cx="300" cy="110" r="50" fill="#fffef5" />

        <!-- High Spire / Cathedral Ledge -->
        <g id="spire-ledge" fill="#020308">
          <polygon points="260,320 290,195 310,195 340,320" />
          <polygon points="280,195 300,150 320,195" />
        </g>

        <!-- Hero Silhouette looking at Moon -->
        <g id="hero-spire" transform="translate(290, 118)">
          <!-- Cape hanging down -->
          <path d="M 8,16 Q 3,28 0,40 Q 10,38 18,30 Z" fill="#010206" />
          <!-- Head & Body -->
          <ellipse cx="12" cy="20" rx="6" ry="9" fill="#010206" />
          <circle cx="12" cy="9" r="6" fill="#010206" />
          <polygon points="7,7 6,1 10,4" fill="#010206" />
          <polygon points="17,7 18,1 14,4" fill="#010206" />
          <!-- Glowing Eyes gazing upward -->
          <circle cx="10" cy="8" r="1.1" fill="#70d6ff" />
          <circle cx="14" cy="8" r="1.1" fill="#70d6ff" />
        </g>

        <!-- Swoop Glider across Moon -->
        <g id="hero-moon-swoop" opacity="0" transform="translate(-100, -100)">
          <path d="M 0,16 Q 20,-4 42,10 Q 24,28 16,24 Z" fill="#010206" />
          <path d="M 0,16 Q -20,-4 -42,10 Q -24,28 -16,24 Z" fill="#010206" />
          <ellipse cx="0" cy="16" rx="7" ry="11" fill="#010206" />
          <circle cx="0" cy="5" r="6" fill="#010206" />
          <polygon points="-4,3 -6,-3 -1,1" fill="#010206" />
          <polygon points="4,3 6,-3 1,1" fill="#010206" />
          <circle cx="-2" cy="4" r="1.1" fill="#70d6ff" />
          <circle cx="2" cy="4" r="1.1" fill="#70d6ff" />
        </g>
      </svg>
    `;
  }

  /**
   * Plays the Screen 7 sequence: Looking at moon -> Dynamic swoop -> Dialogue
   */
  static playScene2Animation(callback) {
    const spireHero = document.getElementById('hero-spire');
    const swoopHero = document.getElementById('hero-moon-swoop');

    setTimeout(() => {
      if (spireHero) spireHero.style.opacity = '0';
      if (swoopHero) {
        swoopHero.style.opacity = '1';
        swoopHero.style.animation = 'heroGlideAcross 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      }
    }, 1400);

    setTimeout(() => {
      if (callback) callback();
    }, 3000);
  }

  /**
   * Generates the Peaceful Rooftop SVG for the Final Screen
   */
  static renderFinalSceneArt(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <svg class="final-moon-hero-art" viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="finalMoonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff8db" stop-opacity="1" />
            <stop offset="50%" stop-color="#ffd166" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#ffd166" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Glowing Crescent Moon in Distance -->
        <circle cx="220" cy="70" r="35" fill="url(#finalMoonGlow)" />
        <circle cx="220" cy="70" r="26" fill="#fffdf2" />

        <!-- Distant Skyline Silhouettes -->
        <g fill="#090e24" opacity="0.6">
          <rect x="40" y="130" width="30" height="110" />
          <rect x="90" y="110" width="40" height="130" />
          <polygon points="110,85 90,110 130,110" />
          <rect x="310" y="120" width="45" height="120" />
          <rect x="375" y="140" width="35" height="100" />
        </g>

        <!-- Foreground Rooftop where hero is sitting peacefully -->
        <polygon points="140,240 170,165 270,165 300,240" fill="#04060e" />
        <rect x="165" y="165" width="110" height="8" fill="#070a18" />

        <!-- Cute Tiny Hero Sitting on edge with dangling feet looking up at stars -->
        <g transform="translate(210, 130)">
          <!-- Soft cape resting on roof behind -->
          <path d="M 8,14 Q 2,24 1,32 Q 10,32 16,28 Z" fill="#020308" />
          <!-- Body -->
          <ellipse cx="12" cy="18" rx="6" ry="8" fill="#020308" />
          <!-- Head tilted upward -->
          <circle cx="12" cy="8" r="6" fill="#020308" />
          <polygon points="7,6 5,0 10,3" fill="#020308" />
          <polygon points="17,6 19,0 14,3" fill="#020308" />
          <!-- Soft glowing eyes looking at sky -->
          <circle cx="10" cy="7" r="1" fill="#70d6ff" />
          <circle cx="14" cy="7" r="1" fill="#70d6ff" />
          <!-- Dangling cute little feet -->
          <rect x="8" y="24" width="2.5" height="10" rx="1.2" fill="#020308" />
          <rect x="13" y="24" width="2.5" height="10" rx="1.2" fill="#020308" />
        </g>
      </svg>
    `;
  }
}
