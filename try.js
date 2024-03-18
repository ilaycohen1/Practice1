function gridContainer(){
    let container=document.createElement("div");
    container.className = "grid-container";
    container.id = "container"
    for (let i = 0; i < 25000; i++) {
        let pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.id = i;
        container.appendChild(pixel);
    }
    
    document.body.appendChild(container);
}
 
gridContainer()

const myTimeout = setTimeout(startGame, 1000);

let snakeStatus = {"headIndex":0, "direction":"right", "snakeLength":"1", "turnsList":[2]};
let onOff = {"gameStatus" : "ON"}
localStorage.setItem("onOff", JSON.stringify(onOff));
localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));


function moveRight(){
    // clearInterval(snakeStatus.intervalId);
    snakeStatus.intervalId = setInterval(() => {
        if ((snakeStatus.headIndex+1)%200==0) {
            clearInterval(snakeStatus.intervalId);
            document.body.innerHTML = "GAME OVER";
        }
        else if (JSON.parse(localStorage.getItem("snakeStatus"))["direction"] == "right" && JSON.parse(localStorage.getItem("onOff"))["gameStatus"] == "ON") {
            document.getElementById(snakeStatus.headIndex).style.backgroundColor = "red";
            let sumTurns = 0;
            snakeStatus.headIndex ++;
            for (let i = snakeStatus.turnsList.length-snakeStatus.snakeLength; i < snakeStatus.turnsList.length; i++){
                snakeStatus.turnsList.forEach(item => {sumTurns+=item});
                document.getElementById(snakeStatus.headIndex+sumTurns).style.backgroundColor = "black";
            }
            snakeStatus.turnsList.push(-1)
            localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
        }
    }, 30);
}

function moveLeft(){
    clearInterval(snakeStatus.intervalId);
    snakeStatus.intervalId = setInterval(() => {
        if (snakeStatus.headIndex%200==0) {
            clearInterval(snakeStatus.intervalId);
            document.body.innerHTML = "GAME OVER";
        }
        else if (JSON.parse(localStorage.getItem("snakeStatus"))["direction"] == "left" && JSON.parse(localStorage.getItem("onOff"))["gameStatus"] == "ON") {
            document.getElementById(snakeStatus.headIndex).style.backgroundColor = "red";
            snakeStatus.headIndex --;
            let sumTurns = 0;
            snakeStatus.turnsList.forEach(i => {sumTurns+=i});
            document.getElementById(snakeStatus.headIndex+sumTurns).style.backgroundColor = "black";
            snakeStatus.turnsList.push(+1)
            localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
        }
        else {
            return;
        }
    }, 30);
}

function moveDown(){
    clearInterval(snakeStatus.intervalId);
    snakeStatus.intervalId = setInterval(() => {
        if (snakeStatus.headIndex>=24999) {
            clearInterval(snakeStatus.intervalId);
            document.body.innerHTML = "GAME OVER";
        }
        else if (JSON.parse(localStorage.getItem("snakeStatus"))["direction"] == "down" && JSON.parse(localStorage.getItem("onOff"))["gameStatus"] == "ON") {
            document.getElementById(snakeStatus.headIndex).style.backgroundColor = "red";
            snakeStatus.headIndex += 200;
            let sumTurns = 0;
            snakeStatus.turnsList.forEach(i => {sumTurns+=i});
            document.getElementById(snakeStatus.headIndex-sumTurns).style.backgroundColor = "black";
            snakeStatus.turnsList.push(+200)
            localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
        }
        else {
            return;
        }
    }, 20);
}

function moveUp(){
    clearInterval(snakeStatus.intervalId);
    snakeStatus.intervalId = setInterval(() => {
        if (snakeStatus.headIndex<=0) {
            clearInterval(snakeStatus.intervalId);
            document.body.innerHTML = "GAME OVER";
        }
        else if (JSON.parse(localStorage.getItem("snakeStatus"))["direction"] == "up" && JSON.parse(localStorage.getItem("onOff"))["gameStatus"] == "ON") {
            document.getElementById(snakeStatus.headIndex).style.backgroundColor = "red";
            snakeStatus.headIndex += -200;
            let sumTurns = 0;
            snakeStatus.turnsList.forEach(i => {sumTurns+=i});
            document.getElementById(snakeStatus.headIndex+sumTurns).style.backgroundColor = "black";
            snakeStatus.turnsList.push(-200)
            localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
        }
        else {
            return;
        }
    }, 20);
}

function startGame() {
    moveRight();
}

function stopGame() {
    return;
}

document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowRight":
            moveRight();
                snakeStatus.direction = "right";
                localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
                break;
    
        case "ArrowLeft":
            moveLeft();
                snakeStatus.direction = "left";
                localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
                break;
        case "ArrowDown":
            moveDown();
                snakeStatus.direction = "down"; 
                localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
                break;
            
        case "ArrowUp":
            moveUp();
                snakeStatus.direction = "up";
                localStorage.setItem("snakeStatus", JSON.stringify(snakeStatus));
                break;
        
        case "Space":
        case " ":
            clearInterval(snakeStatus.intervalId);
            if (onOff.gameStatus == "ON") {
                onOff.gameStatus = "OFF";
            }
            else if (onOff.gameStatus == "OFF") {
                onOff.gameStatus = "ON";
                startGame()
            }
            localStorage.setItem("onOff", JSON.stringify(onOff));
    }
}
    

