// Criando os arrays e variáveis
const emojis = [
    '🍕', '🍕', '🍔', '🍔', '🌭', '🌭', '🍟', '🍟', '🍣', '🍣', '🥨', '🥨'
];
let openCards = [];
let gameActive = false; // Variável para controlar o estado do jogo

const state = {
    view: {
        timeLeft: document.querySelector("#time-left"),
        startButton: document.querySelector("#start-button")
    },
    values: {
        currentTime: 60
    },
    actions: {
        countDownTimerId: null
    }
};

// Função para criar e randomizar os cards
function createBoard() {
    const gameBoard = document.querySelector(".game");
    gameBoard.innerHTML = ''; // Limpa o tabuleiro antes de começar
    const shuffleEmojis = emojis.sort(() => Math.random() > 0.5 ? 1 : -1); // Randomiza os emojis

    // Criando a estrutura do game
    shuffleEmojis.forEach(emoji => {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;
        box.onclick = handleClick; // Adiciona o evento de clique
        gameBoard.appendChild(box);
    });
}

// Função para iniciar o jogo
function startGame() {
    // Reinicia o tempo e atualiza a exibição
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;

    // Inicia o timer
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    gameActive = true; // Ativa o jogo
    createBoard(); // Cria o tabuleiro
}

// Criando um timer
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        gameActive = false; // Desativa o jogo quando o tempo acaba
        alert("Tempo esgotado! Fim de jogo.");
    }
}

// Função de click
function handleClick() {
    if (!gameActive || openCards.length >= 2) return; // Bloqueia o clique se o jogo não estiver ativo

    this.classList.add("boxOpen");
    openCards.push(this);

    if (openCards.length === 2) {
        setTimeout(checkCards, 500);
    }
}

// Função de verificação das cartas
function checkCards() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    // Verifica se o jogo foi vencido
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você venceu!");
        clearInterval(state.actions.countDownTimerId); // Para o timer ao vencer
        gameActive = false; // Desativa o jogo após vencer
    }
}

// Adiciona o evento de clique ao botão para iniciar o countdown
state.view.startButton.addEventListener("click", startGame);
