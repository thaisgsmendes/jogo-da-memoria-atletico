const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let firstCard;
let secondCard;

let lockBoard = false;


// ==========================================
// CRONÔMETRO
// ==========================================

let seconds = 0;

let timerInterval = null;

let gameStarted = false;

let matchedPairs = 0;

const timerElement =
  document.getElementById("timer");


// ==========================================
// ELEMENTOS DA TELA DE VITÓRIA
// ==========================================

const victoryOverlay =
  document.getElementById("victoryOverlay");

const finalTime =
  document.getElementById("finalTime");

const restartButton =
  document.getElementById("restartButton");

const closeButton =
  document.getElementById("closeButton");

const confettiContainer =
  document.getElementById("confettiContainer");


// ==========================================
// INICIA O CRONÔMETRO
// ==========================================

function startTimer() {

  if (gameStarted) {
    return;
  }

  gameStarted = true;


  timerInterval = setInterval(() => {

    seconds++;


    const minutes =
      Math.floor(seconds / 60);


    const remainingSeconds =
      seconds % 60;


    timerElement.textContent =
      `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  }, 1000);
}


// ==========================================
// PARA O CRONÔMETRO
// ==========================================

function stopTimer() {

  clearInterval(timerInterval);

  timerInterval = null;
}


// ==========================================
// VIRAR CARTA
// ==========================================

function flipCard() {

  if (lockBoard) {
    return;
  }


  if (this === firstCard) {
    return;
  }


  // Começa o cronômetro
  // ao clicar na primeira carta

  startTimer();


  this.classList.add("flip");


  if (!hasFlippedCard) {

    hasFlippedCard = true;

    firstCard = this;

    return;
  }


  secondCard = this;

  hasFlippedCard = false;


  checkForMatch();
}


// ==========================================
// VERIFICA AS CARTAS
// ==========================================

function checkForMatch() {

  if (
    firstCard.dataset.card ===
    secondCard.dataset.card
  ) {

    disableCards();

    return;
  }


  unflipCards();
}


// ==========================================
// DESABILITA CARTAS CORRETAS
// ==========================================

function disableCards() {

  firstCard.removeEventListener(
    "click",
    flipCard
  );


  secondCard.removeEventListener(
    "click",
    flipCard
  );


  matchedPairs++;


  // Verifica se encontrou
  // todos os 6 pares

  if (
    matchedPairs === cards.length / 2
  ) {

    stopTimer();


    setTimeout(() => {

      showVictoryScreen();

    }, 500);
  }


  resetBoard();
}


// ==========================================
// DESVIRA CARTAS ERRADAS
// ==========================================

function unflipCards() {

  lockBoard = true;


  setTimeout(() => {

    firstCard.classList.remove("flip");

    secondCard.classList.remove("flip");


    resetBoard();

  }, 1500);
}


// ==========================================
// RESETA TABULEIRO
// ==========================================

function resetBoard() {

  [hasFlippedCard, lockBoard] =
    [false, false];


  [firstCard, secondCard] =
    [null, null];
}


// ==========================================
// EMBARALHA CARTAS
// ==========================================

function shuffleCards() {

  cards.forEach((card) => {

    const randomPosition =
      Math.floor(
        Math.random() * cards.length
      );


    card.style.order =
      randomPosition;

  });
}


// ==========================================
// CRIA CONFETES
// ==========================================

function createConfetti() {

  confettiContainer.innerHTML = "";


  const colors = [
    "#FFD700",
    "#FFFFFF",
    "#111111",
    "#D4AF4D",
    "#FF4D4D",
    "#00CFFF",
    "#7CFF4D",
    "#FF66CC"
  ];


  // Cria 120 pedaços de confete

  for (let i = 0; i < 120; i++) {

    const confetti =
      document.createElement("span");


    confetti.classList.add("confetti");


    // Posição horizontal aleatória

    confetti.style.left =
      Math.random() * 100 + "%";


    // Cor aleatória

    confetti.style.backgroundColor =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    // Tamanho aleatório

    const width =
      Math.random() * 7 + 5;


    const height =
      Math.random() * 10 + 8;


    confetti.style.width =
      width + "px";


    confetti.style.height =
      height + "px";


    // Velocidade aleatória

    confetti.style.animationDuration =
      Math.random() * 2 + 2.5 + "s";


    // Atraso aleatório

    confetti.style.animationDelay =
      Math.random() * 1.5 + "s";


    confettiContainer.appendChild(
      confetti
    );
  }
}


// ==========================================
// MOSTRA TELA DE VITÓRIA
// ==========================================

function showVictoryScreen() {

  // Coloca o tempo final

  finalTime.textContent =
    timerElement.textContent;


  // Cria os confetes

  createConfetti();


  // Mostra a tela

  victoryOverlay.classList.add("show");
}


// ==========================================
// FECHA A TELA DE VITÓRIA
// ==========================================

closeButton.addEventListener(
  "click",
  () => {

    victoryOverlay.classList.remove(
      "show"
    );

  }
);


// ==========================================
// JOGAR NOVAMENTE
// ==========================================

restartButton.addEventListener(
  "click",
  () => {

    restartGame();

  }
);


// ==========================================
// REINICIA O JOGO
// ==========================================

function restartGame() {

  // Fecha a tela

  victoryOverlay.classList.remove(
    "show"
  );


  // Limpa os confetes

  confettiContainer.innerHTML = "";


  // Para qualquer cronômetro

  stopTimer();


  // Reseta cronômetro

  seconds = 0;

  timerElement.textContent =
    "00:00";


  // Reseta estado do jogo

  gameStarted = false;

  matchedPairs = 0;

  hasFlippedCard = false;

  lockBoard = false;

  firstCard = null;

  secondCard = null;


  // Mostra novamente todas as cartas

  cards.forEach((card) => {

    card.classList.remove("flip");

    card.style.order = "";

    card.addEventListener(
      "click",
      flipCard
    );

  });


  // Embaralha novamente

  setTimeout(() => {

    shuffleCards();

  }, 100);
}


// ==========================================
// EMBARALHA AO ABRIR A PÁGINA
// ==========================================

shuffleCards();


// ==========================================
// ADICIONA EVENTO ÀS CARTAS
// ==========================================

cards.forEach((card) => {

  card.addEventListener(
    "click",
    flipCard
  );

});