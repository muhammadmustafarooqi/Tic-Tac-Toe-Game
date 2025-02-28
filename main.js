let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rest-btn");
let msgContainer = document.querySelector(".message-container");
let drawmessage = document.querySelector(".message-container-draw");
let newGamebtn = document.querySelector("#restart-btn");
let msg = document.querySelector("#msg");
let msg1 = document.querySelector("#msg1");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWin();
    });
});

const showWinner = (win) => {
    msg.innerText = `Player ${win} wins!`;
    msgContainer.classList.add("show");
    disabledBoxes();
};

const showDraw = () => {
    msg1.innerText = "It's a draw!";
    drawmessage.classList.add("show");
    disabledBoxes();
};

const checkWin = () => {
    let filled = 0;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    boxes.forEach((box) => {
        if (box.innerText !== "") {
            filled++;
        }
    });

    if (filled === 9) {
        showDraw();
    }
};

const disabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.remove("show");
    drawmessage.classList.remove("show");
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
