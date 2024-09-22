let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.getElementById("reset-btn");
const modal = document.getElementById("winner-modal");
const winnerMessage = document.getElementById("winner-message");
const closeModal = document.getElementById("close-modal");

const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const displayWinnerModal = (winner, userChoice, compChoice) => {
    if (winner === "You") {
        winnerMessage.innerText = `${winner} wins! Congratulations!`;
    } else {
        winnerMessage.innerText = `Better luck next time! ${compChoice} beats your ${userChoice}`;
    }
    modal.style.display = "flex";
};

const drawGame = () => {
    msg.innerText = "Game was a Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    // Check for a winner
    if (userScore === 3) {
        displayWinnerModal("You", userChoice, compChoice);
        resetGame();
    } else if (compScore === 3) {
        displayWinnerModal("Computer", userChoice, compChoice);
        resetGame();
    }
};

const playGame = (userChoice) => {
    const compChoice = getCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = (userChoice === "rock" && compChoice === "scissors") ||
                      (userChoice === "paper" && compChoice === "rock") ||
                      (userChoice === "scissors" && compChoice === "paper");
        showWinner(userWin, userChoice, compChoice);
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play Your Move!";
    msg.style.backgroundColor = "#081b31";
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", resetGame);

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
