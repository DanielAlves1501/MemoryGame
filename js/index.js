const memoryCards = document.querySelectorAll('.memory-table__card')
const totalMovesMetric = document.querySelector('#totalMovesMetric');
const rightGuess = document.querySelector('#rightGuess')
const memoryTable = document.querySelector('.memory-table');
const wrongBg = document.querySelector('.wrong-bg');

let moves = 0;
let totalMoves = 0;
let cardsGuessed = 0;
let cardsLeft = [];
let cardA;
let cardB;
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
            cardA = null;
            cardB = null;
        } else{
            wrongBg.classList.add('wrong-bg--show')
            cardA.classList.add('card-cover');
            cardB.classList.add('card-cover');
            moves = 0;
            totalMoves++;
            cardA = null;
            cardB = null;
        }
    }

    totalMovesMetric.textContent = totalMoves;
    rightGuess.textContent = cardsGuessed;
}

function handleClick(card){
    gameLogic(card)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiar elementos array[i] y array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

memoryTable.innerHTML = '';
shuffledCards.forEach(card => {
    memoryTable.appendChild(card);
});


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
