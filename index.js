function changeGabarites () {
    const gameAreaheight = gameArea.getBoundingClientRect().height;
    const gameAreaWidth = gameArea.getBoundingClientRect().width;
    if ((buttonContainer.getBoundingClientRect().width >= gameAreaheight || gameAreaheight < 990)) {
        if (gameAreaheight > gameAreaWidth) {
            buttonContainer.style.width = `${gameAreaWidth}px`;
            buttonContainer.style.height = `${gameAreaWidth}px`;
        } else {
            buttonContainer.style.height = `${gameAreaheight}px`;
            buttonContainer.style.width = `${gameAreaheight}px`;
        }
    } else if (gameAreaWidth > 990 && gameAreaheight > 990){
        buttonContainer.style.width = `990px`;
        buttonContainer.style.height = `990px`; 
    } else {
        buttonContainer.style.width = `${gameAreaWidth}px`;
        buttonContainer.style.height = `${gameAreaWidth}px`;
    }
    restartButton.style.width = `${headerDiv.getBoundingClientRect().height}px`;
    clicker.style.fontSize = `${16 * (buttonContainer.getBoundingClientRect().width / 100)}px`;
}

function gameModeStylesReleased () {
    clicker.style.backgroundColor = releasedColors[ingameData.gameMode];    
    if (ingameData.gameMode === 0 || ingameData.gameMode === 8) {
        clicker.style.color = "#ffffff";
    } else if (ingameData.gameMode === 9) {
        clicker.style.color = "#000000";
    }
}

function gameModeStylesPressed () {
    clicker.style.backgroundColor = pressedColors[ingameData.gameMode];
}

function clicked () {
    counterValue = 1 * counterValue + (1 * ingameData.clickerCoef);
    window.localStorage.savedCounterValue = counterValue;
    counter.innerText = counterValue;
    ingameData.logicCounter++;
    if (ingameData.logicCounter >= 25) {
        ingameData.logicCounter = 0;
        if (ingameData.gameMode <= 10) {
            ingameData.timeCoef++;
            ingameData.clickerCoef++;
            ingameData.gameMode++;
        }
        
    }
    clearTimeout(stopWatch);
    stopWatch = setTimeout(losingStreak, 5000 / ingameData.timeCoef)
}

function pressed () {
    pressSnd.play();
    gameModeStylesPressed();
}

function released (){
    releaseSnd.play();
    gameModeStylesReleased();
}

function losingStreak () {
    ingameData.logicCounter = 0;
    gameModeStylesReleased()
    if (ingameData.gameMode > 0) {
        ingameData.gameMode--;
        ingameData.clickerCoef--;
        ingameData.timeCoef--;
        stopWatch = setTimeout(losingStreak, 5000 / ingameData.timeCoef)
    }
}

function restart () {
    counterValue = 0
    window.localStorage.savedCounterValue = counterValue;
    counter.innerText = counterValue;
    ingameData.clickerCoef = 1;
    ingameData.timeCoef = 1;
    ingameData.gameMode = 0;
}



const gameArea = document.querySelector(".game-area");
const headerDiv = document.querySelector(".header-container");
const buttonContainer = document.querySelector(".button-container");
const restartButton = document.querySelector(".restart");
const counter = document.querySelector(".counter");
const clicker = document.querySelector(".clicker");
let counterValue;
let stopWatch;
const releasedColors = ["#330000", "#710000", "#820000", "#7c2a00", "#894019", "#82711a", "#aa8f00", "#bc9d00", "#f1ca00", "#ddcf85", "#f4f0d9"];
const pressedColors = ["#1f0000", "#5f0101", "#690202", "#6b2500", "#723514", "#6b5d15", "#947c00", "#ac9001", "#d5b303", "#aea369", "#cbc6ad"];
const pressSnd = new Audio('sound/mousePress.mp3');
const releaseSnd = new Audio('sound/mouseRelease.mp3');
const ingameData = {
    clickerCoef: 1,
    timeCoef: 1,
    gameMode: 0,
    logicCounter: 0,
}


if (window.localStorage.getItem("savedCounterValue") === null) {
    counterValue = 0;
} else {
    counterValue = window.localStorage.getItem("savedCounterValue");
}
counter.innerText = counterValue;


changeGabarites();
gameModeStylesReleased();
window.addEventListener("resize", changeGabarites);
restartButton.addEventListener("click", restart);
clicker.addEventListener("click", clicked);
clicker.addEventListener("mousedown", pressed);
clicker.addEventListener("mouseup", released);
clicker.addEventListener("touchstart", pressed);
clicker.addEventListener("touchend", released);
