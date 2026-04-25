const screens = {
  intro: document.getElementById("introScreen"),
  subject: document.getElementById("subjectScreen"),
  teams: document.getElementById("teamsScreen"),
  countdown: document.getElementById("countdownScreen"),
  game: document.getElementById("gameScreen"),
};

const startTugGameBtn = document.getElementById("startTugGameBtn");
const toTeamsBtn = document.getElementById("toTeamsBtn");
const backToSubjectsBtn = document.getElementById("backToSubjectsBtn");
const startWithMusicBtn = document.getElementById("startWithMusicBtn");
const startWithoutMusicBtn = document.getElementById("startWithoutMusicBtn");
const restartGameBtn = document.getElementById("restartGameBtn");

const subjectCards = document.querySelectorAll(".subject-card");
const blueTeamNameInput = document.getElementById("blueTeamName");
const redTeamNameInput = document.getElementById("redTeamName");

const gameTitle = document.getElementById("gameTitle");
const blueTeamLabel = document.getElementById("blueTeamLabel");
const redTeamLabel = document.getElementById("redTeamLabel");
const blueScore = document.getElementById("blueScore");
const redScore = document.getElementById("redScore");

const blueQuestionTitle = document.getElementById("blueQuestionTitle");
const redQuestionTitle = document.getElementById("redQuestionTitle");
const blueAnswers = document.getElementById("blueAnswers");
const redAnswers = document.getElementById("redAnswers");

const ropeWorld = document.getElementById("ropeWorld");
const countdownNumber = document.getElementById("countdownNumber");

const gameMusic = document.getElementById("gameMusic");
const prevTrackBtn = document.getElementById("prevTrackBtn");
const nextTrackBtn = document.getElementById("nextTrackBtn");
const toggleMusicBtn = document.getElementById("toggleMusicBtn");
const trackName = document.getElementById("trackName");
const fireworksContainer = document.getElementById("fireworksContainer");

const playlist = [
  { name: "Happy Nation", file: "../images/happy-nation.mp3" },
  { name: "Fairytale", file: "../images/fairytale.mp3" },
  { name: "Papaoutai", file: "../images/papaoutai.mp3" },
  { name: "Cheri Cheri Lady", file: "../images/cheri-cheri-lady.mp3" },
  { name: "Me Gustas Tu", file: "../images/me-gustas-tu.mp3" },
  { name: "Daylight", file: "../images/daylight.mp3" },
  { name: "Diet Mountain Dew", file: "../images/diet-mountain-dew.mp3" },
  { name: "Danciin", file: "../images/danciin.mp3" }
];

let currentTrackIndex = 0;
let musicEnabled = false;

let selectedSubject = "Ona tili";
let blueTeamName = "Ko‘k";
let redTeamName = "Qizil";

let ropePosition = 0;
let bluePoints = 0;
let redPoints = 0;

let blueQueue = [];
let redQueue = [];
let isRoundLocked = false;

const WIN_SCORE = 30;

const questionsBySubject = {
  "Ona tili": {
    easy: [
      { question: "Qaysi so‘z shaxsni bildiradi?", answers: ["Yaxshi", "U", "Yozmoq", "Kitob"], correct: 1 },
      { question: "Qaysi biri ot?", answers: ["Yugurmoq", "Daraxt", "Tez", "Ko‘k"], correct: 1 },
      { question: "Qaysi so‘z fe’l?", answers: ["Kitob", "Yozmoq", "Qalam", "Chiroyli"], correct: 1 },
      { question: "Qaysi biri sifat?", answers: ["Bola", "Qizil", "Daftar", "Yozdi"], correct: 1 },
      { question: "Qaysi gap to‘g‘ri?", answers: ["Men kitob o‘qidim", "Men kitob chiroyli", "Men tez daftar", "Men o‘qimoq"], correct: 0 }
    ],
    medium: [
      { question: "Qaysi gapda ega bor?", answers: ["Tez yugur", "Men uyga bordim", "Chiroyli yoz", "Sekin yur"], correct: 1 },
      { question: "Qaysi so‘z ko‘plikda?", answers: ["qalam", "uylar", "bola", "kitob"], correct: 1 },
      { question: "Qaysi biri olmosh?", answers: ["Kim", "Qizil", "Yozmoq", "Tez"], correct: 0 },
      { question: "Qaysi buyruq mayli?", answers: ["Bordi", "Boradi", "Bor", "Borgan"], correct: 2 },
      { question: "Qaysi gapda fe’l bor?", answers: ["Yangi daftar", "Men kuldim", "Ko‘k osmon", "Chiroyli gul"], correct: 1 }
    ],
    hard: [
      { question: "Qaysi biri ravish?", answers: ["Tez", "Daftar", "Yozmoq", "Bola"], correct: 0 },
      { question: "Qaysi gapda aniqlovchi bor?", answers: ["Qizil gul ochildi", "Men bordim", "U kuldi", "Bor!"], correct: 0 },
      { question: "Qaysi so‘z turkumi o‘zgarmaydi?", answers: ["Fe’l", "Ot", "Ravish", "Sifat"], correct: 2 },
      { question: "Qaysi biri undov?", answers: ["Voy", "Kitob", "Yaxshi", "Bola"], correct: 0 },
      { question: "Qaysi gap so‘roq gap?", answers: ["Men keldim.", "U yaxshi.", "Sen bordingmi?", "Bor!"], correct: 2 }
    ]
  },

  "Matematika": {
    easy: [
      { question: "5 + 7 nechiga teng?", answers: ["10", "11", "12", "13"], correct: 2 },
      { question: "9 × 3 nechiga teng?", answers: ["27", "21", "18", "24"], correct: 0 },
      { question: "16 ÷ 4 nechiga teng?", answers: ["2", "4", "6", "8"], correct: 1 },
      { question: "12 - 5 nechiga teng?", answers: ["5", "6", "7", "8"], correct: 2 },
      { question: "20 ÷ 5 nechiga teng?", answers: ["2", "3", "4", "5"], correct: 2 }
    ],
    medium: [
      { question: "7 ning kvadrati nechiga teng?", answers: ["14", "21", "49", "56"], correct: 2 },
      { question: "6 ning kvadrati nechiga teng?", answers: ["12", "18", "24", "36"], correct: 3 },
      { question: "10 + 15 nechiga teng?", answers: ["20", "25", "30", "15"], correct: 1 },
      { question: "14 - 9 nechiga teng?", answers: ["3", "4", "5", "6"], correct: 2 },
      { question: "3 × 8 nechiga teng?", answers: ["24", "21", "18", "28"], correct: 0 }
    ],
    hard: [
      { question: "144 ning ildizi nechiga teng?", answers: ["10", "11", "12", "13"], correct: 2 },
      { question: "25% of 200 nechiga teng?", answers: ["25", "50", "75", "100"], correct: 1 },
      { question: "3/4 ning 20 dagi qiymati?", answers: ["10", "12", "15", "18"], correct: 2 },
      { question: "2x = 18 bo‘lsa, x = ?", answers: ["6", "7", "8", "9"], correct: 3 },
      { question: "15 ning 20% qismi?", answers: ["2", "3", "4", "5"], correct: 1 }
    ]
  },

  "Ingliz tili": {
    easy: [
      { question: "Which one is a color?", answers: ["Run", "Blue", "Book", "Eat"], correct: 1 },
      { question: "Which word is a noun?", answers: ["Quickly", "Beautiful", "Apple", "Write"], correct: 2 },
      { question: "What is the plural of 'child'?", answers: ["childs", "children", "childes", "child"], correct: 1 },
      { question: "Which one is a verb?", answers: ["Table", "Run", "Blue", "Happy"], correct: 1 },
      { question: "Which one is a fruit?", answers: ["Chair", "Banana", "River", "School"], correct: 1 }
    ],
    medium: [
      { question: "Choose the correct sentence.", answers: ["He go school", "He goes to school", "He going school", "He to school"], correct: 1 },
      { question: "What is the opposite of 'big'?", answers: ["Tall", "Small", "Fast", "Long"], correct: 1 },
      { question: "Choose the correct article.", answers: ["a apple", "an apple", "the apple is", "apple a"], correct: 1 },
      { question: "Which word is a pronoun?", answers: ["He", "Book", "Jump", "Green"], correct: 0 },
      { question: "Choose the correct form.", answers: ["She are happy", "She am happy", "She is happy", "She be happy"], correct: 2 }
    ],
    hard: [
      { question: "Choose Present Perfect.", answers: ["I go", "I went", "I have gone", "I going"], correct: 2 },
      { question: "Which is an adverb?", answers: ["Quick", "Quickly", "Quickness", "Quicker"], correct: 1 },
      { question: "Passive form: 'They built it'?", answers: ["It built", "It was built", "It is build", "It has build"], correct: 1 },
      { question: "Choose correct modal.", answers: ["He can to swim", "He can swim", "He cans swim", "He can swims"], correct: 1 },
      { question: "Which is conditional?", answers: ["If I study, I pass", "If I study, I will pass", "If I studied, I pass", "If study, pass"], correct: 1 }
    ]
  },

  "Tarix": {
    easy: [
      { question: "Amir Temur kim bo‘lgan?", answers: ["Shoir", "Sarkarda", "Olim", "Hunarmand"], correct: 1 },
      { question: "Tarix nimani o‘rganadi?", answers: ["Kelajakni", "Tabiatni", "O‘tmishni", "Faqat kitobni"], correct: 2 },
      { question: "Mustaqillik kuni qachon?", answers: ["1-sentabr", "8-dekabr", "21-mart", "9-may"], correct: 0 },
      { question: "Qadimgi Misr nimasi bilan mashhur?", answers: ["Piramidalar", "Samolyot", "Internet", "Radio"], correct: 0 },
      { question: "Buyuk Ipak yo‘li nima uchun mashhur?", answers: ["Sport", "Savdo", "Telefon", "Kompyuter"], correct: 1 }
    ],
    medium: [
      { question: "Tarixiy manba nima?", answers: ["Kelajak reja", "O‘tmish haqida ma’lumot", "Matematika kitobi", "Qo‘shiq"], correct: 1 },
      { question: "O‘zbekiston poytaxti qaysi shahar?", answers: ["Samarqand", "Buxoro", "Toshkent", "Xiva"], correct: 2 },
      { question: "Qadimgi Rim nimasi bilan mashhur?", answers: ["Piramida", "Kolizey", "Internet", "Traktor"], correct: 1 },
      { question: "Tarixda sana nimani bildiradi?", answers: ["Joy nomi", "Vaqt", "Rang", "Kitob"], correct: 1 },
      { question: "Temuriylar davri kim bilan bog‘liq?", answers: ["Amir Temur", "Beruniy", "Navoiy", "Ibn Sino"], correct: 0 }
    ],
    hard: [
      { question: "Konstitutsiya kuni qachon?", answers: ["1-sentabr", "8-dekabr", "9-may", "31-avgust"], correct: 1 },
      { question: "Qadimgi Yunonistondagi mashhur shahar-davlat?", answers: ["Afina", "Buxoro", "Misr", "Toshkent"], correct: 0 },
      { question: "Renessans avvalo qayerda boshlandi?", answers: ["Fransiya", "Italiya", "Ispaniya", "Rossiya"], correct: 1 },
      { question: "Kolumb nimani mashhur qilgan?", answers: ["Elektrni", "Amerikani kashf etishni", "Telefonni", "Poezdni"], correct: 1 },
      { question: "Qadimgi Mesopotamiya qayerda joylashgan?", answers: ["Nil bo‘yida", "Dajla va Furot oralig‘ida", "Hindistonda", "Xitoyda"], correct: 1 }
    ]
  }
};

function showScreen(screenKey) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active-screen"));
  screens[screenKey].classList.add("active-screen");
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getDifficultyByScore(score) {
  if (score >= 20) return "hard";
  if (score >= 10) return "medium";
  return "easy";
}

function getQuestionForSubject(subject, difficulty, usedSet) {
  const pool = questionsBySubject[subject][difficulty];
  const available = pool.filter((q) => !usedSet.has(q.question));

  if (available.length === 0) {
    usedSet.clear();
    return shuffleArray(pool)[0];
  }

  return shuffleArray(available)[0];
}

subjectCards.forEach((card) => {
  card.addEventListener("click", () => {
    subjectCards.forEach((item) => item.classList.remove("selected-subject"));
    card.classList.add("selected-subject");
    selectedSubject = card.dataset.subject;
  });
});

startTugGameBtn.addEventListener("click", () => {
  showScreen("subject");
});

toTeamsBtn.addEventListener("click", () => {
  showScreen("teams");
});

backToSubjectsBtn.addEventListener("click", () => {
  showScreen("subject");
});

startWithMusicBtn.addEventListener("click", () => {
  setupTeams();
  musicEnabled = true;
  startCountdown();
});

startWithoutMusicBtn.addEventListener("click", () => {
  setupTeams();
  musicEnabled = false;
  stopMusic();
  startCountdown();
});

restartGameBtn.addEventListener("click", () => {
  startGame();
});

function setupTeams() {
  blueTeamName = blueTeamNameInput.value.trim() || "Ko‘k";
  redTeamName = redTeamNameInput.value.trim() || "Qizil";

  gameTitle.textContent = `ARQON TORTISH: ${selectedSubject.toUpperCase()}`;
  blueTeamLabel.textContent = blueTeamName;
  redTeamLabel.textContent = redTeamName;
}

function startCountdown() {
  showScreen("countdown");

  let count = 3;
  countdownNumber.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
    } else if (count === 0) {
      countdownNumber.textContent = "START!";
    } else {
      clearInterval(interval);
      startGame();
      showScreen("game");
      if (musicEnabled) playCurrentTrack();
    }
  }, 900);
}

let blueUsedQuestions = new Set();
let redUsedQuestions = new Set();

function startGame() {
  ropePosition = 0;
  bluePoints = 0;
  redPoints = 0;
  isRoundLocked = false;
  blueUsedQuestions.clear();
  redUsedQuestions.clear();

  updateScore();
  updateRope();
  nextRoundQuestions();
  updateTrackName();
}

function updateScore() {
  blueScore.textContent = bluePoints;
  redScore.textContent = redPoints;
}

function updateRope() {
  if (ropeWorld) {
    ropeWorld.style.transform = `translateX(${ropePosition}px)`;
  }
}

function nextRoundQuestions() {
  const blueDifficulty = getDifficultyByScore(bluePoints);
  const redDifficulty = getDifficultyByScore(redPoints);

  const blueQuestion = getQuestionForSubject(selectedSubject, blueDifficulty, blueUsedQuestions);
  const redQuestion = getQuestionForSubject(selectedSubject, redDifficulty, redUsedQuestions);

  blueUsedQuestions.add(blueQuestion.question);
  redUsedQuestions.add(redQuestion.question);

  renderQuestion(blueQuestionTitle, blueAnswers, blueQuestion, "blue");
  renderQuestion(redQuestionTitle, redAnswers, redQuestion, "red");
  isRoundLocked = false;
}

function renderQuestion(titleEl, answersEl, questionData, side) {
  titleEl.textContent = questionData.question;
  answersEl.innerHTML = "";

  questionData.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${answer}`;

    btn.addEventListener("click", () => {
      if (isRoundLocked) return;
      isRoundLocked = true;

      const buttons = answersEl.querySelectorAll(".answer-btn");
      buttons.forEach((item) => (item.disabled = true));

      const isCorrect = index === questionData.correct;

      if (isCorrect) {
        btn.classList.add("correct-answer");

        if (side === "blue") {
          bluePoints++;
          ropePosition -= 10;
        } else {
          redPoints++;
          ropePosition += 10;
        }

        updateScore();
        updateRope();
      } else {
        btn.classList.add("wrong-answer");
        buttons[questionData.correct].classList.add("correct-answer");
      }

      if (bluePoints >= WIN_SCORE) {
        setTimeout(() => endGame(blueTeamName), 700);
        return;
      }

      if (redPoints >= WIN_SCORE) {
        setTimeout(() => endGame(redTeamName), 700);
        return;
      }

      setTimeout(() => {
        nextRoundQuestions();
      }, 700);
    });

    answersEl.appendChild(btn);
  });
}

function endGame(winnerName) {
  launchFireworks();
  alert(`${winnerName} jamoasi 30 ochko bilan g‘alaba qozondi!`);
}

function launchFireworks() {
  fireworksContainer.innerHTML = "";

  for (let i = 0; i < 26; i++) {
    const spark = document.createElement("div");
    spark.className = "firework";

    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 60 + "%";
    spark.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;

    fireworksContainer.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 1600);
  }
}

function updateTrackName() {
  if (!musicEnabled) {
    trackName.textContent = "Musiqa o‘chirilgan";
    toggleMusicBtn.textContent = "▶";
    return;
  }

  trackName.textContent = playlist[currentTrackIndex].name;
  toggleMusicBtn.textContent = gameMusic.paused ? "▶" : "⏸";
}

function playCurrentTrack() {
  const current = playlist[currentTrackIndex];
  gameMusic.src = current.file;
  gameMusic.play().catch(() => {});
  updateTrackName();
}

function stopMusic() {
  gameMusic.pause();
  gameMusic.currentTime = 0;
  updateTrackName();
}

prevTrackBtn.addEventListener("click", () => {
  currentTrackIndex--;
  if (currentTrackIndex < 0) currentTrackIndex = playlist.length - 1;
  if (musicEnabled) playCurrentTrack();
  else updateTrackName();
});

nextTrackBtn.addEventListener("click", () => {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) currentTrackIndex = 0;
  if (musicEnabled) playCurrentTrack();
  else updateTrackName();
});

toggleMusicBtn.addEventListener("click", () => {
  if (!musicEnabled) {
    musicEnabled = true;
    playCurrentTrack();
    return;
  }

  if (gameMusic.paused) {
    gameMusic.play().catch(() => {});
  } else {
    gameMusic.pause();
  }

  updateTrackName();
});

gameMusic.addEventListener("ended", () => {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) currentTrackIndex = 0;
  if (musicEnabled) playCurrentTrack();
});

updateTrackName();
