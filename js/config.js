/**
 * ====================================================================
 * PROJECT OCT — CONFIGURATION & CONTENT
 * ====================================================================
 * You can easily customize any of the text, nickname, cards, or messages
 * here. All the important values are kept in this single file.
 */

const PROJECT_CONFIG = {
  // --------------------------------------------------
  // BASIC DETAILS
  // --------------------------------------------------
  recipientName: "Raghu",
  birthdayDateFormatted: "03 • 10 • 2026",
  
  // The secret nickname needed to unlock Screen 2.
  // Matching is case-insensitive and trims extra spaces.
  secretNickname: "Ammadu",

  // --------------------------------------------------
  // BACKGROUND MUSIC CONFIGURATION
  // --------------------------------------------------
  music: {
    // If you add a custom MP3 audio file, put the path here (e.g., "assets/audio/background.mp3")
    audioSrc: "assets/audio/background.mp3",
    // If audioSrc file is not found, the website will automatically play
    // a beautiful, soothing, romantic starry synth lullaby generated with Web Audio API!
    useSynthFallback: true,
    initialVolume: 0.45
  },

  // --------------------------------------------------
  // SCREEN 1 — MYSTERIOUS OPENING
  // --------------------------------------------------
  screen1: {
    line1: "Hey...",
    line2: "I made something for you.",
    line3: "But you're going to have to figure it out. 👀",
    buttonText: "LET'S SEE ✨"
  },

  // --------------------------------------------------
  // SCREEN 2 — THE LITTLE SECRET (RIDDLE)
  // --------------------------------------------------
  screen2: {
    intro1: "Before we continue...",
    intro2: "There's one little secret.",
    question: "What would you call me?",
    placeholder: "Type your answer...",
    unlockButton: "UNLOCK 🔓",
    
    // Feedback messages for wrong attempts:
    wrongAttempts: [
      "Nope 😂 Try again.",
      "You're really making me question everything right now 😭",
      "Okay okay... one more chance."
    ],
    
    // Feedback when correct:
    correctTitle: "Hmm... you remembered. ❤️",
    correctSubtitle: "Okay. You can come in.",
    continueButton: "CONTINUE →"
  },

  // --------------------------------------------------
  // SCREEN 3 — FIRST LITTLE SUPERHERO SURPRISE
  // --------------------------------------------------
  screen3: {
    dialogue1: "Okay... maybe that was unnecessary. 😂",
    dialogue2: "But we're just getting started.",
    continueButton: "EXPLORE MORE →"
  },

  // --------------------------------------------------
  // SCREEN 4 — FUN / CURIOUS INTERACTION
  // --------------------------------------------------
  screen4: {
    title: "Since you passed the first secret...",
    subtitle: "Let's see what you find next. 👀",
    choices: [
      {
        id: "cute",
        badge: "❤️",
        title: "Something cute",
        message: "You're cute. That's all. Moving on. 😌❤️"
      },
      {
        id: "suspicious",
        badge: "👀",
        title: "Something suspicious",
        message: "Hmm... why did you choose this one? 👀"
      },
      {
        id: "unexpected",
        badge: "🎁",
        title: "Something unexpected",
        message: "You're getting closer..."
      }
    ],
    continueButton: "CONTINUE JOURNEY →"
  },

  // --------------------------------------------------
  // SCREEN 5 — LONG-DISTANCE SECTION
  // --------------------------------------------------
  screen5: {
    line1: "Different places.",
    line2: "Different screens.",
    line3: "Same little world. ❤️",
    line4: "Distance doesn't get to decide how important someone is.",
    location1Label: "You 📍",
    location2Label: "Me 📍",
    continueButton: "WHAT COMES NEXT →"
  },

  // --------------------------------------------------
  // SCREEN 6 — LITTLE THINGS
  // --------------------------------------------------
  screen6: {
    title: "Little Things That Remind Me of You",
    subtitle: "Tap each card to reveal a little memory ✨",
    cards: [
      {
        icon: "🎵",
        title: "Late Night Music",
        tag: "Melodies",
        text: "Every time a special melody plays at 2 AM, it feels like you're right here sharing earphones with me."
      },
      {
        icon: "🌙",
        title: "Late-Night Talks",
        tag: "Deep Calls",
        text: "Those long, comforting calls where hours feel like minutes and laughing together makes everything better."
      },
      {
        icon: "🍕",
        title: "Food & Cravings",
        tag: "Cravings",
        text: "Every time I eat something delicious, I make a mental note: 'I have to make him try this someday!'"
      },
      {
        icon: "💬",
        title: "Random Messages",
        tag: "Pings",
        text: "The random memes, unexpected 'did you eat?' texts, and silly pings that brighten up my entire day."
      },
      {
        icon: "😂",
        title: "Inside Jokes",
        tag: "Only Us",
        text: "The funny nicknames, goofy moments, and secret codes that nobody else in the universe would understand."
      },
      {
        icon: "✨",
        title: "Little Habits",
        tag: "You",
        text: "How you talk about things you love, the way you make me smile, and how safe you make me feel."
      }
    ],
    continueButton: "READY FOR THE NEXT STEP →"
  },

  // --------------------------------------------------
  // SCREEN 7 — SECOND LITTLE SUPERHERO INTERLUDE
  // --------------------------------------------------
  screen7: {
    dialogue1: "Okay... enough suspense. 😂",
    dialogue2: "I think you're ready.",
    revealButton: "REVEAL SURPRISE ✨"
  },

  // --------------------------------------------------
  // SCREEN 8 — BIRTHDAY REVEAL
  // --------------------------------------------------
  screen8: {
    date: "03 • 10 • 2026",
    name: "RAGHUU...",
    greeting: "HAPPY BIRTHDAY, MY BOYYY ❤️",
    buttonText: "READ MY LETTER 💌"
  },

  // --------------------------------------------------
  // SCREEN 9 — FINAL PERSONAL MESSAGE (EXACT VERBATIM)
  // --------------------------------------------------
  screen9: {
    // IMPORTANT: Exact words, spelling, punctuation, and emojis preserved
    title: "A Letter From My Heart 💌",
    messageParagraphs: [
      "Raghuu… ❤️",
      "I know I can’t afford to give you what you want right now. 🥺 But this is the one little skill I have, so I wanted to use it to make something special just for youu, my boyy. ❤️",
      "This may be a veryy small birthday present from me, but I made it with all my heart. 🫶🏻 I hope someday, I’ll be able to give you everything you want and make all those little wishes of yours come true. Until then, let me keep giving you little pieces of my love like this. ❤️",
      "I lovee youuu, bavaa. ❤️❤️❤️",
      "Once again…",
      "🎂✨ HAPPY BIRTHDAY, MY BOYYY! 🥳❤️🦇",
      "Please be safe, eat well, sleep well, and take care of yourself. And no matter how far apart we are, remember that there’s always someone here who loves youuu. ❤️",
      "Happy Birthday, Raghuu. 🫂❤️"
    ],
    continueButton: "THERE'S ONE MORE THING... →"
  },

  // --------------------------------------------------
  // SCREEN 10 — FINAL SECRET
  // --------------------------------------------------
  screen10: {
    pause1: "Wait...",
    pause2: "You didn't think that was everything, did you? 👀",
    buttonText: "ONE MORE →",
    line1: "Someday, we'll have all the memories we don't have yet. ❤️",
    line2: "Until then...",
    line3: "I'll keep choosing you, from wherever I am.",
    finishButton: "TO FOREVER ✨"
  },

  // --------------------------------------------------
  // FINAL SCREEN
  // --------------------------------------------------
  finalScreen: {
    date: "03 • 10 • 2026",
    credit: "Made with ❤️",
    forWho: "for Raghuu.",
    wish: "Happy Birthday, my boyy. ❤️",
    replayButton: "Replay ↻"
  }
};
