//criando os arrays e variaveis
const emojis =[
    '🍕', '🍕', '🍔', '🍔', '🌭', '🌭', '🍟', '🍟', '🍣', '🍣','🥨','🥨'
];
let openCards = [];

const state = {
    view:{
    timeLeft: document.querySelector("#time-left")
    },
    values: {
        currentTime: 60
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    }
};

//Criando um timer
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
    }
}
//randomizando os cards
let shuffleEmojis = emojis.sort(() =>(Math.random()> 0.5 ? 2 : -1))

//Criando a estrutura do game
for(let i=0; i < emojis.length; i++){
    let box = document.createElement("div");box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}


//Função de click
function handleClick(){
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2){
        setTimeout(checkCards, 500);
    }else{
        openCards[0].classList.remove
    }
}

//Função de verificação das cartas
function checkCards(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        alert("Você venceu")
    }
};

// Função para iniciar o jogo (somente o countdown é iniciado aqui)
function startGame() {
    // Reinicia o tempo e atualiza a exibição
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;

    // Inicia o timer
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

// Adiciona o evento de clique ao botão para iniciar o countdown
state.view.startButton.addEventListener("click", startGame);