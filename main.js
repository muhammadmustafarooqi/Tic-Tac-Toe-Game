let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rest-btn");
let msgContainer = document.querySelector(".message-container");
let drawmessage = document.querySelector(".message-container-draw");
let newGameBtns = document.querySelectorAll("#restart-btn");
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
        checkDraw();
    });
});

const showWinner = (win) => {
    msg.innerText = `Player ${win} wins!`;
    msgContainer.classList.add("show");
    setTimeout(() => {
        msgContainer.classList.remove("show");
    }, 10000);
    disabledBoxes();
};

const showDraw = () => {
    msg1.innerText = "It's a draw!";
    drawmessage.classList.add("show");
    setTimeout(() => {
        drawmessage.classList.remove("show");
    }, 8000);
    disabledBoxes();
};

const checkWin = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }
};

const checkDraw = () => {
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });
    if (isDraw) {
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

newGameBtns.forEach((btn) => {
    btn.addEventListener("click", resetGame);
});
resetBtn.addEventListener("click", resetGame);
