/**
 * ====================================================================
 * PROJECT OCT — MASTER APPLICATION CONTROLLER
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Engines
  const starfield = new StarfieldEngine('starfield-canvas');
  const confetti = new ConfettiEngine('confetti-canvas');
  const audioManager = new AudioManager(PROJECT_CONFIG.music);

  let currentScreen = 1;
  let wrongRiddleAttempts = 0;
  const exploredChoices = new Set();
  const flippedCards = new Set();

  // Screen Elements Cache
  const screens = {
    1: document.getElementById('screen-1'),
    2: document.getElementById('screen-2'),
    3: document.getElementById('screen-3'),
    4: document.getElementById('screen-4'),
    5: document.getElementById('screen-5'),
    6: document.getElementById('screen-6'),
    7: document.getElementById('screen-7'),
    8: document.getElementById('screen-8'),
    9: document.getElementById('screen-9'),
    10: document.getElementById('screen-10'),
    11: document.getElementById('screen-11')
  };

  /**
   * Smoothly navigates between screens
   */
  function goToScreen(targetScreenNum) {
    const prevEl = screens[currentScreen];
    const nextEl = screens[targetScreenNum];

    if (!nextEl) return;

    if (prevEl) {
      prevEl.classList.remove('active');
      prevEl.classList.add('fade-out');
      setTimeout(() => {
        prevEl.classList.remove('fade-out');
        prevEl.style.display = 'none';
      }, 500);
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      nextEl.style.display = 'flex';
      // Force reflow
      void nextEl.offsetWidth;
      nextEl.classList.add('active');
      currentScreen = targetScreenNum;

      // Trigger Screen Specific Entry Actions
      handleScreenEntry(targetScreenNum);
    }, 450);
  }

  /**
   * Screen Specific Entry Animations & State Handlers
   */
  function handleScreenEntry(screenNum) {
    switch (screenNum) {
      case 1:
        initScreen1();
        break;
      case 2:
        initScreen2();
        break;
      case 3:
        initScreen3();
        break;
      case 4:
        initScreen4();
        break;
      case 5:
        initScreen5();
        break;
      case 6:
        initScreen6();
        break;
      case 7:
        initScreen7();
        break;
      case 8:
        initScreen8();
        break;
      case 9:
        initScreen9();
        break;
      case 10:
        initScreen10();
        break;
      case 11:
        initScreen11();
        break;
    }
  }

  // --------------------------------------------------
  // SCREEN 1 — MYSTERIOUS OPENING
  // --------------------------------------------------
  function initScreen1() {
    const s1 = PROJECT_CONFIG.screen1;
    const l1 = document.getElementById('s1-line1');
    const l2 = document.getElementById('s1-line2');
    const l3 = document.getElementById('s1-line3');
    const btn = document.getElementById('s1-btn');

    l1.textContent = s1.line1;
    l2.textContent = s1.line2;
    l3.textContent = s1.line3;
    btn.textContent = s1.buttonText;

    // Reset visibility
    [l1, l2, l3, btn].forEach(el => el.classList.remove('visible'));
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';

    // Cinematic Staggered Reveal
    setTimeout(() => l1.classList.add('visible'), 600);
    setTimeout(() => l2.classList.add('visible'), 1800);
    setTimeout(() => l3.classList.add('visible'), 3200);
    setTimeout(() => {
      btn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }, 4200);

    btn.onclick = () => goToScreen(2);
  }

  // --------------------------------------------------
  // SCREEN 2 — THE LITTLE SECRET (RIDDLE)
  // --------------------------------------------------
  function initScreen2() {
    const s2 = PROJECT_CONFIG.screen2;
    const input = document.getElementById('secret-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const feedback = document.getElementById('secret-feedback');
    const formPanel = document.getElementById('secret-form-panel');
    const successPanel = document.getElementById('secret-success-panel');
    const continueBtn = document.getElementById('s2-continue-btn');

    document.getElementById('s2-intro1').textContent = s2.intro1;
    document.getElementById('s2-intro2').textContent = s2.intro2;
    document.getElementById('s2-question').textContent = s2.question;
    input.placeholder = s2.placeholder;
    unlockBtn.textContent = s2.unlockButton;
    document.getElementById('s2-correct-title').textContent = s2.correctTitle;
    document.getElementById('s2-correct-sub').textContent = s2.correctSubtitle;
    continueBtn.textContent = s2.continueButton;

    // Reset State
    input.value = '';
    formPanel.style.display = 'block';
    successPanel.style.display = 'none';
    feedback.className = 'secret-feedback';
    feedback.textContent = '';
    wrongRiddleAttempts = 0;

    const checkAnswer = () => {
      const userAnswer = input.value.trim().toLowerCase();
      const expectedAnswer = (PROJECT_CONFIG.secretNickname || "Ammadu").trim().toLowerCase();

      const isCorrect = userAnswer === expectedAnswer;

      if (isCorrect) {
        // Unlock Success
        feedback.className = 'secret-feedback show-success';
        feedback.textContent = '✨ Verified!';
        
        confetti.spawnSparkleBurst(window.innerWidth / 2, window.innerHeight * 0.45);

        setTimeout(() => {
          formPanel.style.display = 'none';
          successPanel.style.display = 'flex';
        }, 800);
      } else {
        // Wrong Attempt Logic
        wrongRiddleAttempts++;
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);

        feedback.className = 'secret-feedback show-error';
        const msgs = s2.wrongAttempts;
        if (wrongRiddleAttempts === 1) {
          feedback.textContent = msgs[0];
        } else if (wrongRiddleAttempts === 2) {
          feedback.textContent = msgs[1];
        } else {
          feedback.textContent = msgs[2];
        }
      }
    };

    unlockBtn.onclick = checkAnswer;
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkAnswer();
      }
    };

    continueBtn.onclick = () => goToScreen(3);
  }

  // --------------------------------------------------
  // SCREEN 3 — FIRST LITTLE SUPERHERO INTERLUDE
  // --------------------------------------------------
  function initScreen3() {
    const s3 = PROJECT_CONFIG.screen3;
    const d1 = document.getElementById('s3-dialogue1');
    const d2 = document.getElementById('s3-dialogue2');
    const btn = document.getElementById('s3-continue-btn');

    d1.textContent = s3.dialogue1;
    d2.textContent = s3.dialogue2;
    btn.textContent = s3.continueButton;

    d1.style.opacity = '0';
    d2.style.opacity = '0';
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';

    // Render original cute superhero SVG artwork
    BatSceneController.renderScene1('bat-scene-1-container');

    // Play glide sequence and reveal text
    BatSceneController.playScene1Animation(() => {
      d1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      d1.style.opacity = '1';

      setTimeout(() => {
        d2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        d2.style.opacity = '1';
      }, 1200);

      setTimeout(() => {
        btn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }, 2200);
    });

    btn.onclick = () => goToScreen(4);
  }

  // --------------------------------------------------
  // SCREEN 4 — FUN / CURIOUS 3-CHOICE INTERACTION
  // --------------------------------------------------
  function initScreen4() {
    const s4 = PROJECT_CONFIG.screen4;
    document.getElementById('s4-title').textContent = s4.title;
    document.getElementById('s4-subtitle').textContent = s4.subtitle;
    
    const grid = document.getElementById('s4-choices-grid');
    const revealPanel = document.getElementById('s4-reveal-panel');
    const revealText = document.getElementById('s4-reveal-text');
    const continueBtn = document.getElementById('s4-continue-btn');

    continueBtn.textContent = s4.continueButton;
    grid.innerHTML = '';
    revealText.textContent = "Click any card above to see what it hides...";

    s4.choices.forEach(choice => {
      const card = document.createElement('div');
      card.className = 'choice-card';
      card.innerHTML = `
        <div class="choice-card-badge">${choice.badge}</div>
        <div class="choice-card-title">${choice.title}</div>
      `;

      card.onclick = () => {
        document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('revealed'));
        card.classList.add('revealed');
        exploredChoices.add(choice.id);

        revealText.style.opacity = '0';
        setTimeout(() => {
          revealText.textContent = choice.message;
          revealText.style.opacity = '1';
        }, 200);

        continueBtn.style.opacity = '1';
        continueBtn.style.pointerEvents = 'auto';
      };

      grid.appendChild(card);
    });

    continueBtn.onclick = () => goToScreen(5);
  }

  // --------------------------------------------------
  // SCREEN 5 — LONG-DISTANCE MAP & CONSTELLATION
  // --------------------------------------------------
  function initScreen5() {
    const s5 = PROJECT_CONFIG.screen5;
    const l1 = document.getElementById('s5-line1');
    const l2 = document.getElementById('s5-line2');
    const l3 = document.getElementById('s5-line3');
    const l4 = document.getElementById('s5-line4');
    const btn = document.getElementById('s5-continue-btn');

    l1.textContent = s5.line1;
    l2.textContent = s5.line2;
    l3.textContent = s5.line3;
    l4.textContent = s5.line4;
    btn.textContent = s5.continueButton;

    // Reset lines
    [l1, l2, l3, l4].forEach(el => el.classList.remove('visible'));
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';

    // Render Long-Distance World Constellation SVG
    const mapContainer = document.getElementById('distance-map-stage');
    mapContainer.innerHTML = `
      <svg class="distance-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff7597" />
            <stop offset="50%" stop-color="#ffd166" />
            <stop offset="100%" stop-color="#70d6ff" />
          </linearGradient>
          <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff7597" stop-opacity="1" />
            <stop offset="100%" stop-color="#ff7597" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Subtle Latitude/Longitude Grid -->
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none">
          <line x1="40" y1="50" x2="500" y2="50" />
          <line x1="40" y1="110" x2="500" y2="110" />
          <line x1="40" y1="170" x2="500" y2="170" />
          <line x1="120" y1="20" x2="120" y2="200" />
          <line x1="270" y1="20" x2="270" y2="200" />
          <line x1="420" y1="20" x2="420" y2="200" />
        </g>

        <!-- Connecting Curved Glowing Arc -->
        <path id="connection-arc" d="M 130,130 Q 270,30 410,130" fill="none" stroke="url(#arcGrad)" stroke-width="2.5" stroke-dasharray="8 6" style="animation: dashTravel 4s linear infinite;" />

        <!-- Point 1 (You) -->
        <g transform="translate(130, 130)">
          <circle cx="0" cy="0" r="16" fill="url(#nodePulse)" style="animation: ripplePulse 2s infinite ease-out;" />
          <circle cx="0" cy="0" r="6" fill="#ff7597" />
          <text x="0" y="24" class="distance-node-label">${s5.location1Label || 'You 📍'}</text>
        </g>

        <!-- Point 2 (Me) -->
        <g transform="translate(410, 130)">
          <circle cx="0" cy="0" r="16" fill="url(#nodePulse)" style="animation: ripplePulse 2s infinite ease-out 1s;" />
          <circle cx="0" cy="0" r="6" fill="#70d6ff" />
          <text x="0" y="24" class="distance-node-label">${s5.location2Label || 'Me 📍'}</text>
        </g>

        <!-- Floating Traveling Heart along the arc -->
        <g id="traveling-heart" transform="translate(270, 78)">
          <circle cx="0" cy="0" r="10" fill="rgba(255, 117, 151, 0.3)" />
          <text x="0" y="4" font-size="12" text-anchor="middle" fill="#ffffff">❤️</text>
        </g>
      </svg>
    `;

    // Staggered emotional text reveal
    setTimeout(() => l1.classList.add('visible'), 500);
    setTimeout(() => l2.classList.add('visible'), 1600);
    setTimeout(() => l3.classList.add('visible'), 2800);
    setTimeout(() => l4.classList.add('visible'), 4000);
    setTimeout(() => {
      btn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }, 5200);

    btn.onclick = () => goToScreen(6);
  }

  // --------------------------------------------------
  // SCREEN 6 — "LITTLE THINGS" FLIP CARDS
  // --------------------------------------------------
  function initScreen6() {
    const s6 = PROJECT_CONFIG.screen6;
    document.getElementById('s6-title').textContent = s6.title;
    document.getElementById('s6-subtitle').textContent = s6.subtitle;

    const grid = document.getElementById('s6-cards-grid');
    const continueBtn = document.getElementById('s6-continue-btn');
    continueBtn.textContent = s6.continueButton;
    grid.innerHTML = '';

    s6.cards.forEach((cardData, idx) => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="flip-card-icon">${cardData.icon}</div>
            <div class="flip-card-title">${cardData.title}</div>
            <span class="flip-card-tag">${cardData.tag}</span>
            <div class="flip-card-hint">Tap to flip ✨</div>
          </div>
          <div class="flip-card-back">
            <p>${cardData.text}</p>
          </div>
        </div>
      `;

      card.onclick = () => {
        card.classList.toggle('flipped');
        flippedCards.add(idx);
      };

      grid.appendChild(card);
    });

    continueBtn.onclick = () => goToScreen(7);
  }

  // --------------------------------------------------
  // SCREEN 7 — SECOND LITTLE SUPERHERO INTERLUDE
  // --------------------------------------------------
  function initScreen7() {
    const s7 = PROJECT_CONFIG.screen7;
    const d1 = document.getElementById('s7-dialogue1');
    const d2 = document.getElementById('s7-dialogue2');
    const btn = document.getElementById('s7-reveal-btn');

    d1.textContent = s7.dialogue1;
    d2.textContent = s7.dialogue2;
    btn.textContent = s7.revealButton;

    d1.style.opacity = '0';
    d2.style.opacity = '0';
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';

    BatSceneController.renderScene2('bat-scene-2-container');

    BatSceneController.playScene2Animation(() => {
      d1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      d1.style.opacity = '1';

      setTimeout(() => {
        d2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        d2.style.opacity = '1';
      }, 1100);

      setTimeout(() => {
        btn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      }, 2000);
    });

    btn.onclick = () => goToScreen(8);
  }

  // --------------------------------------------------
  // SCREEN 8 — GRAND BIRTHDAY REVEAL
  // --------------------------------------------------
  function initScreen8() {
    const s8 = PROJECT_CONFIG.screen8;
    const dateEl = document.getElementById('s8-date');
    const nameEl = document.getElementById('s8-name');
    const greetEl = document.getElementById('s8-greeting');
    const btn = document.getElementById('s8-letter-btn');

    dateEl.textContent = s8.date || PROJECT_CONFIG.birthdayDateFormatted;
    nameEl.textContent = s8.name;
    greetEl.textContent = s8.greeting;
    btn.textContent = s8.buttonText;

    // Trigger grand fireworks and gentle floating hearts
    confetti.triggerBirthdayCelebration();

    btn.onclick = () => goToScreen(9);
  }

  // --------------------------------------------------
  // SCREEN 9 — FINAL PERSONAL MESSAGE (VERBATIM)
  // --------------------------------------------------
  function initScreen9() {
    const s9 = PROJECT_CONFIG.screen9;
    document.getElementById('s9-title').textContent = s9.title || "A Letter From My Heart 💌";
    document.getElementById('s9-date').textContent = PROJECT_CONFIG.birthdayDateFormatted;

    const bodyContainer = document.getElementById('s9-letter-body');
    const continueBtn = document.getElementById('s9-continue-btn');
    continueBtn.textContent = s9.continueButton;
    bodyContainer.innerHTML = '';

    // Render paragraphs verbatim
    s9.messageParagraphs.forEach((pText, index) => {
      const p = document.createElement('p');
      p.textContent = pText;

      // Add lovely subtle styling to key greetings while keeping exact text
      if (index === 0) {
        p.className = 'letter-salutation';
      } else if (pText.includes('HAPPY BIRTHDAY, MY BOYYY')) {
        p.className = 'letter-highlight-bday';
      } else if (index === s9.messageParagraphs.length - 1) {
        p.className = 'letter-signoff';
      }

      bodyContainer.appendChild(p);
    });

    continueBtn.onclick = () => goToScreen(10);
  }

  // --------------------------------------------------
  // SCREEN 10 — FINAL SECRET
  // --------------------------------------------------
  function initScreen10() {
    const s10 = PROJECT_CONFIG.screen10;
    const p1 = document.getElementById('s10-pause1');
    const p2 = document.getElementById('s10-pause2');
    const oneMoreBtn = document.getElementById('s10-one-more-btn');
    const quoteBox = document.getElementById('s10-quote-box');
    const finishBtn = document.getElementById('s10-finish-btn');

    p1.textContent = s10.pause1;
    p2.textContent = s10.pause2;
    oneMoreBtn.textContent = s10.buttonText;
    document.getElementById('s10-line1').textContent = s10.line1;
    document.getElementById('s10-line2').textContent = s10.line2;
    document.getElementById('s10-line3').textContent = s10.line3;
    finishBtn.textContent = s10.finishButton;

    // Initial state
    p1.style.opacity = '0';
    p2.style.opacity = '0';
    oneMoreBtn.style.opacity = '0';
    oneMoreBtn.style.pointerEvents = 'none';
    quoteBox.style.display = 'none';

    setTimeout(() => {
      p1.style.transition = 'opacity 0.8s ease';
      p1.style.opacity = '1';
    }, 400);

    setTimeout(() => {
      p2.style.transition = 'opacity 0.8s ease';
      p2.style.opacity = '1';
    }, 1400);

    setTimeout(() => {
      oneMoreBtn.style.transition = 'opacity 0.8s ease';
      oneMoreBtn.style.opacity = '1';
      oneMoreBtn.style.pointerEvents = 'auto';
    }, 2400);

    oneMoreBtn.onclick = () => {
      oneMoreBtn.style.display = 'none';
      quoteBox.style.display = 'flex';
      quoteBox.style.animation = 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    };

    finishBtn.onclick = () => goToScreen(11);
  }

  // --------------------------------------------------
  // FINAL SCREEN — PEACEFUL ROOFTOP & REPLAY
  // --------------------------------------------------
  function initScreen11() {
    const fs = PROJECT_CONFIG.finalScreen;
    document.getElementById('final-date').textContent = fs.date;
    document.getElementById('final-credit').textContent = fs.credit;
    document.getElementById('final-for-who').textContent = fs.forWho;
    document.getElementById('final-wish').textContent = fs.wish;
    
    const replayBtn = document.getElementById('final-replay-btn');
    replayBtn.textContent = fs.replayButton;

    BatSceneController.renderFinalSceneArt('final-art-container');

    replayBtn.onclick = () => {
      confetti.stopFloatingHearts();
      goToScreen(1);
    };
  }

  // Start with Screen 1
  handleScreenEntry(1);
});
