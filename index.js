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
    if (ingameData.gameMode === 0) {
        clicker.style.backgroundColor = "#330000";
        clicker.style.color = "#ffffff";
    } else if (ingameData.gameMode === 1) {
        clicker.style.backgroundColor = "#710000";
    } else if (ingameData.gameMode === 2) {
        clicker.style.backgroundColor = "#820000";
    } else if (ingameData.gameMode === 3) {
        clicker.style.backgroundColor = "#7c2a00";
    } else if (ingameData.gameMode === 4) {
        clicker.style.backgroundColor = "#894019";
    } else if (ingameData.gameMode === 5) {
        clicker.style.backgroundColor = "#82711a";
    } else if (ingameData.gameMode === 6) {
        clicker.style.backgroundColor = "#aa8f00";
    } else if (ingameData.gameMode === 7) {
        clicker.style.backgroundColor = "#bc9d00";
    } else if (ingameData.gameMode === 8) {
        clicker.style.backgroundColor = "#f1ca00";
        clicker.style.color = "#ffffff";
    } else if (ingameData.gameMode === 9) {
        clicker.style.backgroundColor = "#ddcf85";
        clicker.style.color = "#000000";
    } else  {
        clicker.style.backgroundColor = "#f4f0d9";
    }
}

function gameModeStylesPressed () {
    if (ingameData.gameMode === 0) {
        clicker.style.backgroundColor = "#1f0000";
    } else if (ingameData.gameMode === 1) {
        clicker.style.backgroundColor = "#5f0101";
    } else if (ingameData.gameMode === 2) {
        clicker.style.backgroundColor = "#690202";
    } else if (ingameData.gameMode === 3) {
        clicker.style.backgroundColor = "#6b2500";
    } else if (ingameData.gameMode === 4) {
        clicker.style.backgroundColor = "#723514";
    } else if (ingameData.gameMode === 5) {
        clicker.style.backgroundColor = "#6b5d15";
    } else if (ingameData.gameMode === 6) {
        clicker.style.backgroundColor = "#947c00";
    } else if (ingameData.gameMode === 7) {
        clicker.style.backgroundColor = "#ac9001";
    } else if (ingameData.gameMode === 8) {
        clicker.style.backgroundColor = "#d5b303";
    } else if (ingameData.gameMode === 9) {
        clicker.style.backgroundColor = "#aea369";
    } else  {
        clicker.style.backgroundColor = "#cbc6ad";
    }
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
