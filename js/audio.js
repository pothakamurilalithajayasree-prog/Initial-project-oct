/**
 * ====================================================================
 * PROJECT OCT — AUDIO & AMBIENT MUSIC CONTROLLER
 * ====================================================================
 * Features:
 * 1. Safe user-gesture activation (Starts OFF by default).
 * 2. Romantic procedural Web Audio API Starry Synth Lullaby generator
 *    (Zero external assets required, rich dreamy warm chords).
 * 3. MP3 Audio File support with automatic fallback to synth.
 */

class AudioManager {
  constructor(config) {
    this.config = config || {};
    this.isPlaying = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.masterGain = null;
    
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.musicLabel = document.getElementById('music-label');
    
    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Prepare audio element if source provided
    if (this.config.audioSrc) {
      this.audioElement = new Audio();
      this.audioElement.src = this.config.audioSrc;
      this.audioElement.loop = true;
      this.audioElement.volume = this.config.initialVolume || 0.45;
      
      // Fallback to synth if audio file fails to load
      this.audioElement.addEventListener('error', () => {
        console.log("Custom audio not found. Falling back to built-in romantic starry synth.");
        this.audioElement = null;
      });
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play() {
    this.isPlaying = true;
    this.updateUI(true);

    // Try HTML5 audio file first if available
    if (this.audioElement) {
      try {
        await this.audioElement.play();
        return;
      } catch (err) {
        console.log("Audio play error, falling back to Web Audio synth:", err);
      }
    }

    // Play built-in romantic synth
    this.startRomanticSynth();
  }

  pause() {
    this.isPlaying = false;
    this.updateUI(false);

    if (this.audioElement) {
      this.audioElement.pause();
    }

    this.stopRomanticSynth();
  }

  updateUI(playing) {
    if (!this.toggleBtn || !this.musicLabel) return;

    if (playing) {
      this.toggleBtn.classList.add('playing');
      this.musicLabel.textContent = '♫ Music ON';
    } else {
      this.toggleBtn.classList.remove('playing');
      this.musicLabel.textContent = '♪ Music OFF';
    }
  }

  // --------------------------------------------------
  // PROCEDURAL ROMANTIC SYNTH CHIME & PAD ENGINE
  // --------------------------------------------------
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.config.initialVolume || 0.4, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  startRomanticSynth() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    // Progression of romantic starry chords (frequencies in Hz)
    // Cmaj7 -> Am9 -> Fmaj7(#11) -> Gsus4 -> Em7
    const chordProgression = [
      [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7
      [220.00, 261.63, 329.63, 392.00, 440.00], // Am9
      [174.61, 261.63, 329.63, 369.99, 440.00], // Fmaj7(#11)
      [196.00, 261.63, 293.66, 392.00, 493.88], // Gsus4
      [164.81, 246.94, 329.63, 392.00, 493.88]  // Em7
    ];

    let currentChordIndex = 0;

    const playChordStep = () => {
      if (!this.isPlaying) return;

      const chord = chordProgression[currentChordIndex];
      const now = this.audioCtx.currentTime;

      // Play soft warm pad
      chord.slice(0, 3).forEach(freq => {
        this.playPadTone(freq, now, 3.8);
      });

      // Play sweet twinkling bell arp notes
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isPlaying && this.audioCtx) {
            this.playChimeTone(freq * (idx % 2 === 0 ? 2 : 1), this.audioCtx.currentTime, 2.5);
          }
        }, idx * 600 + Math.random() * 200);
      });

      currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 4200);
  }

  playPadTone(freq, startTime, duration) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.055, startTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  playChimeTone(freq, startTime, duration) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Ethereal music-box bell chime envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.045, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  stopRomanticSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}
