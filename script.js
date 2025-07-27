const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const resultElem = document.getElementById('result');

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);

        playerChoiceElem.textContent = playerChoice;
        computerChoiceElem.textContent = computerChoice;
        resultElem.textContent = result;

        if (result === 'You win!') {
            playerScore++;
        } else if (result === 'You lose!') {
            computerScore++;
        }

        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(player, computer) {
    if (player === computer) {
        return 'It\'s a draw!';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
} 