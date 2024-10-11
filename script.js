const symbols = ['🦠', '🧬', '💉', '🔬', '🩸', '😷', '🧪', '🤒', '🧠', '💊']; // Adicione mais emojis se necessário
const memoryGame = document.querySelector('.memory-game');
let firstCard = null;
let secondCard = null;
let currentPlayer = 1; // Para alternar entre os jogadores no modo dupla
let scores = { player1: 0, player2: 0 }; // Pontuação
let modo = 'solo'; // Valor padrão
let dificuldade = 'facil'; // Valor padrão
let numCards = 6; // Número de pares padrão (facil)

// Função para embaralhar array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para criar cartas
function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span>${symbol}</span>`;
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                checkMatch();
            }
        }
    });
    memoryGame.appendChild(card);
}

// Função para verificar combinação
function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        updateScore();
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            switchPlayer(); // Alterna entre os jogadores no modo dupla
            resetCards();
        }, 1000);
    }
}

// Função para alternar jogador
function switchPlayer() {
    if (modo === 'dupla') {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        alert(`Agora é a vez do Jogador ${currentPlayer}`);
    }
}

// Função para atualizar pontuação
function updateScore() {
    if (modo === 'dupla') {
        if (currentPlayer === 1) {
            scores.player1++;
        } else {
            scores.player2++;
        }
    }
}

// Função para reiniciar seleção de cartas
function resetCards() {
    firstCard = null;
    secondCard = null;
}

// Função para iniciar o jogo com base no modo e dificuldade
function iniciarJogo() {
    modo = document.getElementById('modo').value;
    dificuldade = document.getElementById('dificuldade').value;

    // Ajusta o número de pares baseado na dificuldade
    switch(dificuldade) {
        case 'facil':
            numCards = 6;
            break;
        case 'medio':
            numCards = 8;
            break;
        case 'dificil':
            numCards = 10;
            break;
    }

    startGame();
}

// Função para iniciar o jogo
function startGame() {
    memoryGame.innerHTML = '';
    let selectedSymbols = symbols.slice(0, numCards); // Seleciona os símbolos de acordo com a dificuldade
    let combinedSymbols = selectedSymbols.concat(selectedSymbols); // Duplica os símbolos
    shuffle(combinedSymbols); // Embaralha

    combinedSymbols.forEach(symbol => {
        createCard(symbol);
    });

    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.remove('flipped'));
    }, 1000);
}
