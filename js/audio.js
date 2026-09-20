/**
 * ====================================================================
 * PROJECT OCT — AUDIO & AMBIENT MUSIC CONTROLLER (HIGH VOLUME & RICH SOUND)
 * ====================================================================
 * Features:
 * 1. Crystal clear, loud and immersive audio playback (volume ~ 0.9).
 * 2. High-fidelity dynamic compressor limiter to prevent clipping and maximize loudness.
 * 3. HTML5 Audio player with automatic format fallback (.mp3 -> .wav).
 * 4. Rich, multi-layered Web Audio API romantic starry synth lullaby fallback.
 */

class AudioManager {
  constructor(config) {
    this.config = config || {};
    this.isPlaying = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.masterGain = null;
    this.compressor = null;
    
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.musicLabel = document.getElementById('music-label');
    
    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Initialize audio element with high volume
    this.audioElement = new Audio();
    this.audioElement.src = this.config.audioSrc || "assets/audio/background.mp3";
    this.audioElement.loop = true;
    this.audioElement.volume = this.config.initialVolume || 0.9;
    
    // Fallback to .wav if .mp3 fails, then to Web Audio synth
    this.audioElement.addEventListener('error', () => {
      if (this.audioElement && this.audioElement.src.endsWith('.mp3')) {
        console.log("Trying background.wav format...");
        this.audioElement.src = "assets/audio/background.wav";
      } else {
        console.log("Audio file unavailable. Using rich Web Audio synth.");
        this.audioElement = null;
      }
    });
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

    // Try HTML5 audio file first
    if (this.audioElement) {
      try {
        this.audioElement.volume = this.config.initialVolume || 0.9;
        await this.audioElement.play();
        return;
      } catch (err) {
        console.log("HTML5 audio playback blocked/failed, using Web Audio synth:", err);
      }
    }

    // Play loud, rich built-in romantic synth
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
  // PROCEDURAL ROMANTIC SYNTH CHIME & PIANO ENGINE
  // --------------------------------------------------
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();

      // Studio Master Compressor (Maximizes volume & punch while keeping audio warm and smooth)
      this.compressor = this.audioCtx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.audioCtx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.audioCtx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.audioCtx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.config.initialVolume || 0.9, this.audioCtx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  startRomanticSynth() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    // Rich Romantic Starry Chord Progression
    const chordProgression = [
      [130.81, 261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [110.00, 220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [87.31, 174.61, 261.63, 329.63, 392.00, 523.25],  // Fmaj9
      [98.00, 196.00, 246.94, 293.66, 392.00, 440.00],  // Gsus4 / Gadd9
      [82.41, 164.81, 246.94, 329.63, 392.00, 493.88],  // Em9
      [87.31, 174.61, 220.00, 261.63, 329.63, 440.00]   // Fmaj7
    ];

    let currentChordIndex = 0;

    const playChordStep = () => {
      if (!this.isPlaying) return;

      const chord = chordProgression[currentChordIndex];
      const now = this.audioCtx.currentTime;

      // 1. Warm lush low string pad
      this.playPadTone(chord[0], now, 4.5, 0.45);
      this.playPadTone(chord[1], now, 4.5, 0.35);
      this.playPadTone(chord[2], now, 4.5, 0.30);

      // 2. Clear acoustic piano strike
      this.playPianoTone(chord[1], now, 3.2, 0.50);
      this.playPianoTone(chord[2], now, 3.2, 0.45);
      this.playPianoTone(chord[3], now, 3.2, 0.40);

      // 3. Twinkling celestial music-box chimes
      chord.slice(2).forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isPlaying && this.audioCtx) {
            this.playChimeTone(freq * (idx % 2 === 0 ? 2 : 1), this.audioCtx.currentTime, 3.0, 0.55);
          }
        }, idx * 550 + 150);
      });

      currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 3800);
  }

  playPadTone(freq, startTime, duration, vol = 0.35) {
    if (!this.audioCtx) return;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.003, startTime); // subtle detune chorus

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  playPianoTone(freq, startTime, duration, vol = 0.45) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    // Natural piano attack & decay
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  playChimeTone(freq, startTime, duration, vol = 0.50) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

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
