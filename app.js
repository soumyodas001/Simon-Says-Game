let gameSeq = [];
let userSeq = [];
let maxScore = 0;

let btns = ["red", "blue", "yellow", "green"];

let started = false;
let level = 0;
let p1 = document.querySelector("p");
let p2 = document.getElementById("maxScore");

function startGame(){
    if(!started){
        console.log("Game started");
        started = true;
        levelUp();
    }
}
document.addEventListener("click", startGame);
document.addEventListener("keypress", startGame);


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    p1.innerText = `Level - ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(`${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}


function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,800);
        }
    } else {
        p1.innerHTML = `Game Over!<br>Your Score : ${level-1}<br>Press anywhere to restart!`;
        if((level-1) > maxScore)
            maxScore = level - 1;
        p2.innerText = `--- Highest Score : ${maxScore} ---`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        setTimeout(reset, 1000);
    }
}

function btnPress() {
    if(started){
        let btn = this;
        userFlash(btn);
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }
    
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}
