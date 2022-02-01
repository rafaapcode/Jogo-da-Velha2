// Initial Data
let square = {
    a1: "",
    a2: "",
    a3: "",

    b1: "",
    b2: "",
    b3: "",

    c1: "",
    c2: "",
    c3: ""
};

let turn = "";
let warning = "";
let playing = false;

reset();

// Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", itemClick);
});

// Funtions
function itemClick(event) {
    let item = event.target.getAttribute("data-item");
    if (playing && square[item] === "") {
        square[item] = turn;
        renderSquare();
        togglePlayer();
    }
}



function reset() {
    warning = "";

    let random = Math.floor(Math.random() * 2);
    turn = (random === 0) ? "x" : "o";

    for (let i in square) {
        square[i] = "";
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector(".vez").innerHTML = turn;
    document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
    turn = (turn === "x") ? "o" : "x";
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor("x")) {
        warning = "O 'x' VENCEU";
        turn = false;
    }else if(checkWinnerFor("o")){
        warning = "O 'o' VENCEU";
        turn = false;
    }else if(isFull()){
        warning = "Deu VELHA!";
        turn = false;
    }
}

function checkWinnerFor(turn){
    let pos = [
        "a1,a2,a3",
        "b1,b2,b3",
        "c1,c2,c3",

        "a1,b1,c1",
        "a2,b2,c2",
        "a3,b3,c3",

        "a1,b2,c3",
        "a3,b2,c1",
    ];

    for(let w in pos){
        let pArray = pos[w].split(",");
        let won = pArray.every(option => square[option] === turn);
        
        if(won){
            return true;
        }
    }

    return false

}

function isFull(){
    for(let i in square){
        if(square[i] === ""){
            return false;
        }
    }
    return true;
}