const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const resultElem = document.getElementById('result');
const handAnimations = document.getElementById('hand-animations');
const restartBtn = document.getElementById('restart-btn');
const resetScoresBtn = document.getElementById('reset-scores-btn');
const soundWin = document.getElementById('sound-win');
const soundLose = document.getElementById('sound-lose');
const soundDraw = document.getElementById('sound-draw');
const fightOverlay = document.getElementById('fight-overlay');

let playerScore = 0;
let computerScore = 0;
let isGameLocked = false;
let gameOver = false;

const WIN_LIMIT = 3;

const handEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

function animateChoice(button) {
    button.style.transform = 'scale(1.15)';
    setTimeout(() => {
        button.style.transform = '';
    }, 180);
}

function showHands(player, computer, winner) {
    handAnimations.innerHTML = '';
    const playerHand = document.createElement('span');
    playerHand.className = 'hand';
    playerHand.textContent = handEmojis[player];
    playerHand.setAttribute('id', 'player-hand');
    const computerHand = document.createElement('span');
    computerHand.className = 'hand';
    computerHand.textContent = handEmojis[computer];
    computerHand.setAttribute('id', 'computer-hand');

    // Winner animation logic
    if (winner === 'player') {
        if (player === 'rock' && computer === 'scissors') {
            playerHand.classList.add('rock-crack', 'winner-glow');
            computerHand.classList.add('scissors-break');
        } else if (player === 'paper' && computer === 'rock') {
            playerHand.classList.add('paper-wrap', 'winner-glow');
            computerHand.classList.add('rock-fade');
        } else if (player === 'scissors' && computer === 'paper') {
            playerHand.classList.add('scissors-glow', 'winner-glow');
            computerHand.classList.add('paper-cut');
        } else {
            playerHand.classList.add('winner-glow');
        }
    } else if (winner === 'computer') {
        if (computer === 'rock' && player === 'scissors') {
            computerHand.classList.add('rock-crack', 'winner-glow');
            playerHand.classList.add('scissors-break');
        } else if (computer === 'paper' && player === 'rock') {
            computerHand.classList.add('paper-wrap', 'winner-glow');
            playerHand.classList.add('rock-fade');
        } else if (computer === 'scissors' && player === 'paper') {
            computerHand.classList.add('scissors-glow', 'winner-glow');
            playerHand.classList.add('paper-cut');
        } else {
            computerHand.classList.add('winner-glow');
        }
    }
    handAnimations.appendChild(playerHand);
    handAnimations.appendChild(computerHand);
}

function clearHands() {
    handAnimations.innerHTML = '';
}

function showResultText(result) {
    resultElem.textContent = result;
    resultElem.classList.remove('show');
    setTimeout(() => {
        resultElem.classList.add('show');
    }, 50);
}

function playSound(result) {
    if (result === 'You win!') {
        soundWin.currentTime = 0; soundWin.play();
    } else if (result === 'You lose!') {
        soundLose.currentTime = 0; soundLose.play();
    } else {
        soundDraw.currentTime = 0; soundDraw.play();
    }
}

function getResultWithEmoji(player, computer) {
    if (player === computer) {
        return '🤝 It\'s a draw!';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return '🏆 You win!';
    } else {
        return '💀 You lose!';
    }
}

function checkGameOver() {
    if (playerScore >= WIN_LIMIT) {
        showResultText('🏆 You won the game!');
        disableChoices();
        gameOver = true;
        return true;
    } else if (computerScore >= WIN_LIMIT) {
        showResultText('💀 Computer won the game!');
        disableChoices();
        gameOver = true;
        return true;
    }
    return false;
}

function disableChoices() {
    choices.forEach(btn => btn.disabled = true);
}
function enableChoices() {
    choices.forEach(btn => btn.disabled = false);
}

// --- Anime Fight Animation Logic ---
function showFightOverlay() {
    fightOverlay.style.display = 'flex';
    fightOverlay.classList.add('show');
    setTimeout(() => {
        fightOverlay.classList.remove('show');
        fightOverlay.style.display = 'none';
    }, 600);
}

function createImpactLines() {
    const div = document.createElement('div');
    div.className = 'impact-lines';
    div.innerHTML = `<svg viewBox="0 0 120 120"><g stroke="#facc15" stroke-width="4" stroke-linecap="round"><line x1="60" y1="10" x2="60" y2="40"/><line x1="60" y1="110" x2="60" y2="80"/><line x1="10" y1="60" x2="40" y2="60"/><line x1="110" y1="60" x2="80" y2="60"/><line x1="30" y1="30" x2="50" y2="50"/><line x1="90" y1="30" x2="70" y2="50"/><line x1="30" y1="90" x2="50" y2="70"/><line x1="90" y1="90" x2="70" y2="70"/></g></svg>`;
    return div;
}
function createFlash() {
    const div = document.createElement('div');
    div.className = 'flash';
    return div;
}

function playFightScene(player, computer, winner, callback) {
    handAnimations.innerHTML = '';
    const scene = document.createElement('div');
    scene.className = 'fight-scene';
    const playerHand = document.createElement('span');
    playerHand.className = 'hand';
    playerHand.textContent = handEmojis[player];
    playerHand.setAttribute('id', 'player-hand');
    const computerHand = document.createElement('span');
    computerHand.className = 'hand';
    computerHand.textContent = handEmojis[computer];
    computerHand.setAttribute('id', 'computer-hand');
    scene.appendChild(playerHand);
    scene.appendChild(computerHand);
    handAnimations.appendChild(scene);

    // Animate hands toward each other
    playerHand.style.transition = 'transform 0.25s cubic-bezier(.68,-0.55,.27,1.55)';
    computerHand.style.transition = 'transform 0.25s cubic-bezier(.68,-0.55,.27,1.55)';
    setTimeout(() => {
        playerHand.style.transform = 'translateX(40px) scale(1.15)';
        computerHand.style.transform = 'translateX(-40px) scale(1.15)';
    }, 80);
    // Screen shake
    scene.classList.add('screen-shake');
    // Impact lines and flash
    setTimeout(() => {
        scene.appendChild(createImpactLines());
        scene.appendChild(createFlash());
    }, 250);
    // Snap back
    setTimeout(() => {
        playerHand.style.transform = '';
        computerHand.style.transform = '';
    }, 400);
    // Remove effects, then callback
    setTimeout(() => {
        handAnimations.innerHTML = '';
        callback();
    }, 700);
}

// --- Modified Game Logic for Fight Animation ---
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (isGameLocked || gameOver) return;
        isGameLocked = true;
        animateChoice(choice);
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResultWithEmoji(playerChoice, computerChoice);

        // FIGHT! overlay and anime fight
        showFightOverlay();
        setTimeout(() => {
            playFightScene(playerChoice, computerChoice, result.includes('You win!') ? 'player' : result.includes('You lose!') ? 'computer' : null, () => {
                // After fight scene, show hands with winner animation
                playerChoiceElem.textContent = playerChoice;
                computerChoiceElem.textContent = computerChoice;
                let winner = null;
                if (result.includes('You win!')) {
                    playerScore++;
                    winner = 'player';
                } else if (result.includes('You lose!')) {
                    computerScore++;
                    winner = 'computer';
                }
                playerScoreElem.textContent = playerScore;
                computerScoreElem.textContent = computerScore;
                showHands(playerChoice, computerChoice, winner);
                showResultText(result);
                playSound(result.includes('win') ? 'You win!' : result.includes('lose') ? 'You lose!' : 'draw');
                restartBtn.style.display = 'block';
                checkGameOver();
                isGameLocked = false;
            });
        }, 600); // after FIGHT! overlay
    });
});

// Ensure everything resets on Play Again
restartBtn.addEventListener('click', () => {
    isGameLocked = false;
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
    playerChoiceElem.textContent = '';
    computerChoiceElem.textContent = '';
    resultElem.textContent = '';
    resultElem.classList.remove('show');
    clearHands();
    restartBtn.style.display = 'none';
    enableChoices();
    gameOver = false;
    fightOverlay.classList.remove('show');
    fightOverlay.style.display = 'none';
});

resetScoresBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Title Screen Animation Logic
const titleScreen = document.getElementById('title-screen');
function showTitleScreen() {
    document.body.classList.add('title-active');
    titleScreen.classList.remove('hide');
}
function hideTitleScreen() {
    titleScreen.classList.add('hide');
    setTimeout(() => {
        document.body.classList.remove('title-active');
    }, 700); // match CSS transition
}
// Show title screen on load
showTitleScreen();
// Hide on click/tap
function startGameFromTitle() {
    hideTitleScreen();
    window.removeEventListener('click', startGameFromTitle);
    window.removeEventListener('touchstart', startGameFromTitle);
}
window.addEventListener('click', startGameFromTitle);
window.addEventListener('touchstart', startGameFromTitle); 