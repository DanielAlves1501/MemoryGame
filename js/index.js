const memoryCards = document.querySelectorAll('.memory-table__card')
const totalMovesMetric = document.querySelector('#totalMovesMetric');
const rightGuess = document.querySelector('#rightGuess')
const timer = document.querySelector('#timer')
const memoryTable = document.querySelector('.memory-table');
const wrongBg = document.querySelector('.wrong-bg');
const startGameBtn = document.querySelector('.start-game-btn')
const restartGameBtn = document.querySelector('.restart-game-btn')

let moves = 0;
let startGame = false;
let totalMoves = 0;
let cardsGuessed = 0;
let cardsLeft = [];
let cardA;
let cardB;
let segundos = 0;
let minutos = 0;
let temporizador = 0;
const shuffledCards = shuffleArray(Array.from(memoryCards));

function gameLogic (card){
    if(moves < 2){
        card.classList.remove('card-cover')
        if(moves == 0){
            cardA = card
            moves++;
        } else if(moves == 1){
            cardB = card;
            moves++;
        }
        console.log(cardA);
        console.log(cardB);
        console.log(moves)
    }

    if(moves == 2){
        if(cardA.innerHTML == cardB.innerHTML ){
            cardsGuessed++;
            totalMoves++;
            moves = 0;
            cardA = null
            cardB = null;
        } else{
            wrongBg.classList.add('wrong-bg--show')
            memoryTable.style.pointerEvents = 'none'
            setTimeout(() => {
            wrongBg.classList.remove('wrong-bg--show')
            }, 1000);
            
            setTimeout(() => {
            memoryTable.style.pointerEvents = 'visible'
            cardA.classList.add('card-cover');
            cardB.classList.add('card-cover');
            moves = 0;
            totalMoves++;
            cardA = null;
            cardB = null;
            }, 1500);


        }
    }

    if(cardsGuessed == memoryCards.length / 2){
        alert('GANASTE')
        clearInterval(temporizador)
    }
    totalMovesMetric.textContent = totalMoves;
    rightGuess.textContent = cardsGuessed;
}

function handleClick(card){
    if(startGame){
        gameLogic(card)
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiar elementos array[i] y array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer(){
    temporizador = 
    setInterval(()=>{
        segundos++;
        timer.innerHTML = segundos + "s";

    },1000)
}

memoryTable.innerHTML = '';
shuffledCards.forEach(card => {
    memoryTable.appendChild(card);
});

startGameBtn.addEventListener('click',()=>{
    startGame = true;
    startTimer()
})

restartGameBtn.addEventListener('click',()=>{
    shuffleArray(shuffledCards)
    clearInterval(temporizador)

    memoryTable.innerHTML = '';
shuffledCards.forEach(card => {
    memoryTable.appendChild(card);

 moves = 0;
 startGame = false;
 totalMoves = 0;
 cardsGuessed = 0;
 cardsLeft = [];
 cardA;
 cardB;
 segundos = 0;
 minutos = 0;
 timer.innerHTML = '0s'
});

})

memoryTable.addEventListener('click', function(event) {
    const card = event.target.closest('.memory-table__card');
    if (!card || !memoryTable.contains(card)) {
        return; // Si el clic no ocurrió en una tarjeta dentro del contenedor, no hacer nada
    }

    if (!card.classList.contains('card-cover')) {
        return; // Si la tarjeta ya ha sido adivinada, no hacer nada
    }

    handleClick(card);
});
